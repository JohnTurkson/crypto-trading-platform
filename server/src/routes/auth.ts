import express from "express"
import { UserModel } from "../models/User"
import bcrypt from "bcryptjs"

export default (app: express.Application) => {
    app.post("/signup", async (req, res) => {
        const { email, password } = req.body
        
        try {
            const user = await UserModel.create({
                email,
                password
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            user.sendToken(res)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    })

    app.post("/login", async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await UserModel.findOne({ email })

            if (!user) throw new Error("User does not exist")

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw new Error("Wrong password")

            user.sendToken(res)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    })
}