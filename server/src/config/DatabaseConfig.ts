import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export default async function initializeDatabase(): Promise<void> {
    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}
