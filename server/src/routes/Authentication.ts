import express from "express"
import {
    authenticateSignupRequest,
    authorizeSignupRequest,
    processSignupRequest,
    validateSignupRequest
} from "../handlers/HandleSignupRequest"
import DefaultDatabaseProxy from "../database/DefaultDatabaseClient"
import LoginHandler from "../handlers/LoginHandler"

const database = new DefaultDatabaseProxy()

export default (app: express.Application) => {
    app.post("/signup", async (request, response) => {
        validateSignupRequest(request.body)
            .then(signupRequest => authenticateSignupRequest(signupRequest))
            .then(signupRequest => authorizeSignupRequest(signupRequest))
            .then(signupRequest => processSignupRequest(signupRequest))
            .then(signupResponse => response.status(200).json(signupResponse))
            .catch(error => response.status(400).json({error: error.message}))
    })

    app.post("/login", async (request, response) => {
        const handler = new LoginHandler(database)
        handler.handleRequest(request.body)
            .then(loginResponse => response.status(200).json(loginResponse))
            .catch(errorResponse => response.status(400).json(errorResponse))
    })
}
