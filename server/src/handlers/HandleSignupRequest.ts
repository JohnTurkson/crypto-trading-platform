import SignupRequest from "../requests/SignupRequest"
import SignupResponse from "../responses/SignupResponse"
import createUser from "../functions/CreateUser"
import createUserCredentials from "../functions/CreateUserCredentials"
import generateUserToken from "../functions/GenerateUserToken"

export async function validateSignupRequest(request: any): Promise<SignupRequest> {
    return request
}

export async function authenticateSignupRequest(request: SignupRequest): Promise<SignupRequest> {
    return request
}

export async function authorizeSignupRequest(request: any): Promise<SignupRequest> {
    return request
}

export async function processSignupRequest(request: SignupRequest): Promise<SignupResponse> {
    // TODO check if email exists

    const user = await createUser(request.name, request.email)
    const userCredentials = await createUserCredentials(user.id, request.password)
    const userToken = await generateUserToken(user.id)

    // TODO add user, credentials, token to database

    return {
        type: "SignupResponse",
        id: user.id,
        token: userToken,
    }
}
