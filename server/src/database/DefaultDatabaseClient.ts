import DatabaseProxy from "./DatabaseProxy"
import { User } from "../data/User"
import {
    ClientSession,
    Collection,
    MongoClient,
    ReadConcern,
    ReadPreference,
    TransactionOptions,
    WriteConcern
} from "mongodb"
import { UserCredentials } from "../data/UserCredentials"
import { UserToken } from "../data/UserToken"
import { ResourceFilter } from "../data/filters/ResourceFilter"
import generateId from "../functions/user/credentials/GenerateId"
import { Portfolio } from "../data/Portfolio"

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
    
    async createPortfolio(userId: string, name: string): Promise<Portfolio> {
        const portfolios = await this.portfolioCollection
        const id = generateId()
        const portfolio: Portfolio = {
            user: userId,
            name: name,
            id: id
        }
        await portfolios.insertOne(portfolio)
        return portfolio
    }
    
    async listPortfolios(userId: string): Promise<Portfolio[]> {
        const portfolios = await this.portfolioCollection
        return portfolios.find().toArray()
    }
    
    async getPortfolio(userId: string): Promise<Portfolio> {
        const portfolios = await this.portfolioCollection
        const userPortfolio = await portfolios.findOne({userId: userId})
        if (userPortfolio !== undefined) {
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
                .then((user) => {
                    return user !== undefined
                })
            
            if (exists) {
                throw "User already exists"
            }
            
            const id = generateId()
            await users.insertOne(
                {
                    id: id,
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
            
            await this.createPortfolio(id, "")
            
            return {
                id: id,
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
            user: userId,
            token: generateId()
        })
        
        return {
            user: userId,
            token: generateId()
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
    
    private async executeTransaction<T>(transaction: (clientSession: ClientSession) => Promise<T>): Promise<T> {
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
