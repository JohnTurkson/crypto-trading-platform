import { model, Schema } from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import express from "express"

dotenv.config()

export default interface User {
    readonly id: string,
    readonly name: string,
    readonly email: string,
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    }
})

UserSchema.methods.sendToken = function (res: express.Response) {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET!, {expiresIn: "1d"})
    res.status(200).json({success: true, token, user: this})
}

export const UserModel = model<User>("user", UserSchema)
