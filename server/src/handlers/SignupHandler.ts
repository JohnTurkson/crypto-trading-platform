import DefaultHandler from "./DefaultHandler"
import SignupRequest from "../requests/SignupRequest"
import SignupResponse from "../responses/SignupResponse"
import generateUserToken from "../functions/user/credentials/GenerateUserToken"
import ErrorResponse from "../responses/ErrorResponse"
import generatePasswordHash from "../functions/user/credentials/GeneratePasswordHash"

export default class SignupHandler extends DefaultHandler<SignupRequest, SignupResponse> {
    async validateRequest(request: any): Promise<SignupRequest> {
        return request
    }

    async authenticateRequest(request: SignupRequest): Promise<SignupRequest> {
        return request
    }

    async authorizeRequest(request: SignupRequest): Promise<SignupRequest> {
        return request
    }

    async processRequest(request: SignupRequest): Promise<SignupResponse> {
        return generatePasswordHash(request.password)
            .then(hash => this.database.createUser(request.name, request.email, hash))
            .then(user => this.database.createUserToken(user.id, generateUserToken()))
            .then(token => {
                const response: SignupResponse = {
                    type: "SignupResponse",
                    id: token.user,
                    token: token.token,
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
