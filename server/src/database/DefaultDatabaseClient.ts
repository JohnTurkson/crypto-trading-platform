import DatabaseProxy from "./DatabaseProxy"
import User from "../data/User"
import {
    ClientSession,
    Collection,
    MongoClient,
    ReadConcern,
    ReadPreference,
    TransactionOptions,
    WriteConcern
} from "mongodb"
import UserData from "../data/UserData"
import UserCredentials from "../data/UserCredentials"
import Resource from "../data/Resource"
import UserToken from "../data/UserToken"
import { ResourceFilter } from "../data/filters/ResourceFilter"
import generateId from "../functions/user/credentials/GenerateId"
import Portfolio from "../data/Portfolio";
import PortfolioData from "../data/PortfolioData";
import Coin from "../data/Coin";
import AssetData from "../data/AssetData";

export default class DefaultDatabaseProxy implements DatabaseProxy {
    private readonly client = this.provideDatabaseClient()
    private readonly databaseName = "CryptoTradingPlatform"
    private readonly userCollectionName = "Users"
    private readonly userCredentialsCollectionName = "UserCredentials"
    private readonly userTokenCollectionName = "UserTokens"
    private readonly portfolioCollectionName = "Portfolios"
    private readonly userCollection = this.provideDatabaseCollection<User>(
        this.databaseName,
        this.userCollectionName
    )
    private readonly userDataCollection = this.provideDatabaseCollection<UserData>(
        this.databaseName,
        this.userCollectionName
    )
    private readonly userCredentialCollection = this.provideDatabaseCollection<UserCredentials>(
        this.databaseName,
        this.userCredentialsCollectionName
    )
    private readonly userTokenCollection = this.provideDatabaseCollection<UserToken>(
        this.databaseName,
        this.userTokenCollectionName
    )
    private readonly portfolioCollection = this.provideDatabaseCollection<Portfolio>(
        this.databaseName,
        this.portfolioCollectionName
    )
    private readonly portfolioDataCollection = this.provideDatabaseCollection<PortfolioData>(
        this.databaseName,
        this.portfolioCollectionName
    )

    async createPortfolio(userId: string): Promise<Portfolio> {
        const portfolios = await this.portfolioCollection
        const id = generateId()
        const portfolio = {
            userId: userId,
            assets: [],
            id: id
        }
        await portfolios.insertOne(portfolio)
        return portfolio
    }

    async purchaseAsset(userId: string, coinName: string, amountPurchased: string): Promise<AssetData> {
        const portfolios = await this.portfolioCollection
        const userPortfolio = await portfolios.findOne({userId: userId})

        if(userPortfolio !== undefined) {
            const asset = userPortfolio.assets.find((asset) => {
                return asset.coinName === coinName
            })
            const newAssetList = userPortfolio.assets.filter((asset) => {
                return asset.coinName !== coinName
            }) ?? []

            if (asset !== undefined) {
                newAssetList.push({amountOwned: asset.amountOwned + amountPurchased, coinName: asset.coinName})
            } else {
                newAssetList.push({amountOwned: amountPurchased, coinName: coinName})
            }

            const portfolio: Portfolio = {assets: newAssetList, userId: userPortfolio.userId, id: userPortfolio.id}
            await portfolios.replaceOne({id: userPortfolio.id}, portfolio)

            return {amountOwned: amountPurchased, coinName: coinName}
        }

        throw "Missing User Portfolio!"
    }

    async getPortfolio(userId: string): Promise<Portfolio> {
        const portfolios = await this.portfolioCollection
        const userPortfolio = await portfolios.findOne({userId: userId})
        if(userPortfolio !== undefined) {
            return userPortfolio
        }
        throw "Missing User Portfolio!"
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const createUserTransaction = async (session: ClientSession): Promise<User> => {
            const users = await this.userCollection
            const userCredentials = await this.userCredentialCollection

            const exists = await users.findOne(
                {
                    email: email
                },
                {
                    session: session
                })
                .then((user: User) => {
                    return user !== undefined;
                })

            if (exists) {
                throw "User already exists"
            }
            
            const id = generateId()
            await users.insertOne(
                {
                    id: id,
                    name: name,
                    email: email
                },
                {
                    session: session
                }
            )

            await userCredentials.insertOne(
                {
                    user: id,
                    password: password
                },
                {
                    session: session
                }
            )

            await this.createPortfolio(id)

            return {
                id: id,
                name: name,
                email: email
            }
        }

        return this.executeTransaction(createUserTransaction)
    }

    async createUserToken(userId: string, token: string): Promise<UserToken> {
        const user = await this.getUser({
            id: userId
        })

        if (user === null) {
            throw "Invalid user"
        }

        const userTokens = await this.userTokenCollection
        await userTokens.insertOne({
            userId: userId,
            token: token
        })

        return {
            userId: userId,
            token: token
        }
    }

    async getUser(filter: ResourceFilter<User>): Promise<User | undefined> {
        const users = await this.userCollection
        return await users.findOne(filter)
    }

    async getUserCredentials(filter: ResourceFilter<UserCredentials>): Promise<UserCredentials | undefined> {
        const userCredentials = await this.userCredentialCollection
        return userCredentials.findOne(filter)
    }

    private async provideDatabaseClient(): Promise<MongoClient> {
        const url = encodeURI(process.env.MONGO_URL!)
        const client = new MongoClient(url)
        return client.connect()
    }

    private async provideDatabaseSession(): Promise<ClientSession> {
        const client = await this.client
        return client.startSession()
    }

    private async provideDatabaseCollection<T>(database: string, collection: string): Promise<Collection<T>> {
        const client = await this.client
        return client.db(database).collection(collection)
    }

    private async executeTransaction<T extends Resource>(transaction: (clientSession: ClientSession) => Promise<T>): Promise<T> {
        let result: Promise<T>

        const clientSession = await this.provideDatabaseSession()
        const transactionBlock = async () => {
            result = transaction(clientSession)
        }
        const transactionOptions: TransactionOptions = {
            readPreference: ReadPreference.fromString(ReadPreference.PRIMARY),
            readConcern: ReadConcern.fromOptions({
                level: "local"
            }),
            writeConcern: WriteConcern.fromOptions({
                w: "majority"
            })
        }

        await clientSession.withTransaction(transactionBlock, transactionOptions)

        // @ts-ignore
        return result
    }
}
