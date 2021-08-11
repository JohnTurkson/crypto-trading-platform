import { LoginUserRequest } from "../requests/LoginUserRequest"
import { LoginUserResponse } from "../responses/LoginUserResponse"
import verifyUserPassword from "../functions/user/credentials/VerifyUserPassword"
import generateUserToken from "../functions/user/credentials/GenerateUserToken"
import DefaultHandler from "./DefaultHandler"

export default class LoginHandler extends DefaultHandler<LoginUserRequest, LoginUserResponse> {
    async validateRequest(request: any): Promise<LoginUserRequest> {
        return request
    }
    
    async authenticateRequest(request: LoginUserRequest): Promise<LoginUserRequest> {
        return request
    }
    
    async authorizeRequest(request: LoginUserRequest): Promise<LoginUserRequest> {
        return request
    }
    
    async processRequest(request: LoginUserRequest): Promise<LoginUserResponse> {
        const error = {
            type: "ErrorResponse",
            message: "Invalid Credentials"
        }
        
        return this.database.getUser({email: request.email})
            .then(user => {
                if (user === undefined) {
                    throw error
                }
                return user
            })
            .then(user => this.database.getUserCredentials({user: user.id}))
            .then(credentials => {
                if (credentials === undefined) {
                    throw error
                }
                return credentials
            })
            .then(async credentials => {
                const matches = await verifyUserPassword(credentials, request.password)
                if (!matches) {
                    throw error
                }
                return credentials
            })
            .then(credentials => this.database.createUserToken(credentials.user, generateUserToken()))
            .then(token => ({
                success: true,
                user: token.user,
                token: token.token,
            }))
    }
}
