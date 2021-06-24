import * as mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    }
})

UserSchema.methods.sendToken = function(res) {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
    res.status(200).json({ success: true, token, user: this })
}

export const UserModel = mongoose.model("user", UserSchema)