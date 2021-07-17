import LoginRequest from "../requests/LoginRequest"
import LoginResponse from "../responses/LoginResponse"
import verifyUserPassword from "../functions/user/credentials/VerifyUserPassword"
import ErrorResponse from "../responses/ErrorResponse"
import generateUserToken from "../functions/user/credentials/GenerateUserToken"
import DefaultHandler from "./DefaultHandler"

export default class LoginHandler extends DefaultHandler<LoginRequest, LoginResponse> {
    async validateRequest(request: any): Promise<LoginRequest> {
        return request
    }

    async authenticateRequest(request: LoginRequest): Promise<LoginRequest> {
        return request
    }

    async authorizeRequest(request: LoginRequest): Promise<LoginRequest> {
        return request
    }

    async processRequest(request: LoginRequest): Promise<LoginResponse> {
        const error: ErrorResponse = {
            type: "ErrorResponse",
            message: "Invalid Credentials"
        }

        return this.database.getUser({email: request.email})
            .then(user => {
                if (user == null) {
                    throw error
                }
                return user
            })
            .then(user => this.database.getUserCredentials({user: user.id}))
            .then(credentials => {
                if (credentials === null) {
                    throw error
                }
                return credentials
            })
            .then(credentials => {
                const matches = verifyUserPassword(credentials, request.password)
                if (!matches) {
                    throw error
                }
                return credentials
            })
            .then(credentials => this.database.createUserToken(credentials.user, generateUserToken()))
            .then(token => ({
                type: "LoginResponse",
                id: token.user,
                token: token.token,
            }))
    }
}
