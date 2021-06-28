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
        const user = await this.database.getUser({
            email: request.email
        })

        const error: ErrorResponse = {
            type: "ErrorResponse",
            error: "Invalid Credentials"
        }

        if (user === null) {
            throw error
        }

        const userCredentials = await this.database.getUserCredentials({
            user: user.id
        })

        if (userCredentials === null) {
            // TODO log error - should not be possible to have a user without credentials
            throw error
        }

        const passwordMatches = await verifyUserPassword(userCredentials, request.password)

        if (!passwordMatches) {
            throw error
        }

        const token = await generateUserToken()
        await this.database.createUserToken(user.id, token)

        return {
            type: "LoginResponse",
            id: user.id,
            token: token,
        }
    }
}
