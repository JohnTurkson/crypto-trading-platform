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

export default class DefaultDatabaseProxy implements DatabaseProxy {
    private readonly client = this.provideDatabaseClient()
    private readonly databaseName = "CryptoTradingPlatform"
    private readonly userCollectionName = "Users"
    private readonly userCredentialsCollectionName = "UserCredentials"
    private readonly userTokenCollectionName = "UserTokens"
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
                .then(user => user !== undefined)

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
