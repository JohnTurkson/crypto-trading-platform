import express from "express"
import DefaultDatabaseProxy from "../database/DefaultDatabaseClient"
import LoginHandler from "../handlers/LoginHandler"
import SignupHandler from "../handlers/SignupHandler"

const database = new DefaultDatabaseProxy()

export default (app: express.Application) => {
    app.post("/CreateUser", async (request, response) => {
        const handler = new SignupHandler(database)
        handler.handleRequest(request.body)
            .then(signupResponse => response.status(200).json(signupResponse))
            .catch(errorResponse => response.status(400).json(errorResponse))
    })

    app.post("/LoginUser", async (request, response) => {
        const handler = new LoginHandler(database)
        handler.handleRequest(request.body)
            .then(loginResponse => response.status(200).json(loginResponse))
            .catch(errorResponse => response.status(400).json(errorResponse))
    })
}
