import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const initializeDb = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Established connection with mongoDB")
}

export default initializeDb