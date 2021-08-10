import { postApi } from "./DefaultRequest"
import { UserToken } from "../../../server/src/data/UserToken"
import { LoginUserRequest } from "../../../server/src/requests/LoginUserRequest"
import { CreateUserRequest } from "../../../server/src/requests/CreateUserRequest"

export const loginRequest = async (email: string, password: string): Promise<UserToken> => {
    const loginRequest: LoginUserRequest = {email, password}
    return postApi<UserToken, LoginUserRequest>("/LoginUser", loginRequest)
}

export const signupRequest = async (email: string, password: string): Promise<UserToken> => {
    const createUserRequest: CreateUserRequest = {email, password}
    return postApi<UserToken, CreateUserRequest>("/CreateUser", createUserRequest)
}
