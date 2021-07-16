import { Schema, model, Document } from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import express from "express"

dotenv.config()

interface User extends Document {
    email: string;
    password: string;
    sendToken: (res: express.Response) => void;
}

const UserSchema = new Schema<User>({
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

UserSchema.methods.sendToken = function(res: express.Response) {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
    res.status(200).json({ success: true, token, userId: this._id })
}

export const UserModel = model<User>("user", UserSchema)