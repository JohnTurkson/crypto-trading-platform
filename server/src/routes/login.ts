import express from "express"

export default (app: express.Application) => {
    app.get("/login", (req, res) => {
        res.send("LOGIN")
    })
}