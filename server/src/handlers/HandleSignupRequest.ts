import SignupRequest from "../requests/SignupRequest"
import SignupResponse from "../responses/SignupResponse"

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

    
    
    // const user = await createUser(request.name, request.email)
    // const userCredentials = await createUserCredentials(user.id, request.password)

    // TODO add user, credentials, token to database
    // const client = await provideMongoClient()
    // const users: Collection<UserData> = await client.db("crypto").collection("user")
    //
    // const userData: UserData = {
    //     name: request.name,
    //     email: request.email,
    // }
    //
    // // user.find().forEach(e => e.)
    //
    // const user = await users.insertOne(userData)
    //
    // user.insertedId
    //
    // const userToken = await generateUserToken(user.id)

    // TODO return result
    return {
        type: "SignupResponse",
        id: "",
        token: "",
    }
}
