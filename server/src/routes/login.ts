import express from "express"
import { UserModel } from "../models/User"

export default (app: express.Application) => {
    app.post("/signup", async (req, res) => {
        const { email, password } = req.body
        
        try {
            const user = await UserModel.create({
                email,
                password
            })
            user.sendToken(res)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    })
}