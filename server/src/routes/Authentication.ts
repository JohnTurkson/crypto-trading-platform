import express from "express"
import {
    authenticateLoginRequest,
    authorizeLoginRequest,
    processLoginRequest,
    validateLoginRequest
} from "../handlers/HandleLoginRequest"
import {
    authenticateSignupRequest,
    authorizeSignupRequest,
    processSignupRequest,
    validateSignupRequest
} from "../handlers/HandleSignupRequest"

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
        validateLoginRequest(request.body)
            .then(loginRequest => authenticateLoginRequest(loginRequest))
            .then(loginRequest => authorizeLoginRequest(loginRequest))
            .then(loginRequest => processLoginRequest(loginRequest))
            .then(loginResponse => response.status(200).json(loginResponse))
            .catch(error => response.status(400).json({error: error.message}))
    })
}
