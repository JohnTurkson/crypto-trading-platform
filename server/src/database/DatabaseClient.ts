import { MongoClient } from "mongodb"

export default async function provideMongoClient(): Promise<MongoClient> {
    const url = process.env.MONGO_URL!
    return new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).connect()
}
