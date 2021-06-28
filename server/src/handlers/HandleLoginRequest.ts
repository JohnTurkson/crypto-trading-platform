import LoginRequest  from "../requests/LoginRequest"
import LoginResponse from "../responses/LoginResponse"

export async function validateLoginRequest(request: any): Promise<LoginRequest> {
    return request
}

export async function authenticateLoginRequest(request: LoginRequest): Promise<LoginRequest> {
    return request
}

export async function authorizeLoginRequest(request: LoginRequest): Promise<LoginRequest> {
    return request
}

export async function processLoginRequest(request: LoginRequest): Promise<LoginResponse> {
    // TODO check if user exists
    // const user = await getUserByEmail(request.email)
    // const userCredentials = await getUserCredentials(user.id)
    // const isValidLogin = await verifyUserCredentials(userCredentials, request.password)
    //
    // if (!isValidLogin) {
    //     throw Error("Invalid credentials")
    // }
    //
    // const userToken = await generateUserToken(user.id)
    
    return {
        type: "LoginResponse",
        id: "",
        token: "",
    }
}
