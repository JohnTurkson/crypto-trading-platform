import DefaultHandler from "./DefaultHandler"
import CreateUserRequest from "../requests/CreateUserRequest"
import CreateUserResponse from "../responses/CreateUserResponse"
import generateUserToken from "../functions/user/credentials/GenerateUserToken"
import ErrorResponse from "../responses/ErrorResponse"
import generatePasswordHash from "../functions/user/credentials/GeneratePasswordHash"

export default class SignupHandler extends DefaultHandler<CreateUserRequest, CreateUserResponse> {
    async validateRequest(request: any): Promise<CreateUserRequest> {
        return request
    }

    async authenticateRequest(request: CreateUserRequest): Promise<CreateUserRequest> {
        return request
    }

    async authorizeRequest(request: CreateUserRequest): Promise<CreateUserRequest> {
        return request
    }

    async processRequest(request: CreateUserRequest): Promise<CreateUserResponse> {
        return generatePasswordHash(request.password)
            .then(hash => this.database.createUser(request.name, request.email, hash))
            .then(user => this.database.createUserToken(user.id, generateUserToken()))
            .then(token => {
                const response: CreateUserResponse = {
                    success: true,
                    user: token.user,
                    token: token.id,
                }
                return response
            })
            .catch(error => {
                throw {
                    type: "ErrorResponse",
                    message: error
                }
            })
    }
}
