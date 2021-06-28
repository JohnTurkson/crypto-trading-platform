import DatabaseProxy from "./DatabaseProxy"
import User from "../data/User"
import { ClientSession, Collection, MongoClient, TransactionOptions } from "mongodb"
import UserData from "../data/UserData"
import UserCredentials from "../data/UserCredentials"
import Resource from "../data/Resource"
import UserToken from "../data/UserToken"
import { ResourceFilter } from "../data/filters/ResourceFilter"

export default class DefaultDatabaseProxy implements DatabaseProxy {
    private readonly client = this.provideDatabaseClient()
    private readonly databaseName = "crypto"
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
            const users = await this.userDataCollection
            const userCredentials = await this.userCredentialCollection
            const user = await users.insertOne(
                {
                    name: name,
                    email: email
                },
                {
                    session: session
                }
            )
            const id = user.insertedId.toHexString()

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
            .catch(error => error)
    }

    async createUserToken(userId: string, token: string): Promise<UserToken> {
        const user = await this.getUser({
            id: userId
        })

        if (user === null) {
            throw Error("Invalid User")
        }

        const userTokens = await this.userTokenCollection
        await userTokens.insertOne({
            user: userId,
            token: token
        })

        return {
            user: userId,
            token: token
        }
    }
    
    async getUser(filter: ResourceFilter<User>): Promise<User | null> {
        const users = await this.userCollection
        return users.findOne(filter)
    }
    
    async getUserCredentials(filter: ResourceFilter<UserCredentials>): Promise<UserCredentials | null> {
        const userCredentials = await this.userCredentialCollection
        return userCredentials.findOne(filter)
    }

    private async provideDatabaseClient(): Promise<MongoClient> {
        const url = process.env.MONGO_URL!
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
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

    private async executeTransaction(transaction: (clientSession: ClientSession) => Promise<Resource>): Promise<Resource> {
        let result: Promise<Resource>

        const clientSession = await this.provideDatabaseSession()
        const transactionBlock = async () => {
            result = transaction(clientSession)
        }
        const transactionOptions: TransactionOptions = {
            readPreference: "primary",
            readConcern: {
                level: "local"
            },
            writeConcern: {
                w: "majority"
            }
        }

        await clientSession.withTransaction(transactionBlock, transactionOptions)
            .finally(() => clientSession.endSession())

        // @ts-ignore
        return result
    }
}
