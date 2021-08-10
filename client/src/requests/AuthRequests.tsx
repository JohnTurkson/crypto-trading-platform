import { postApi } from "./DefaultRequest"

export interface UserToken {
    user: string;
    token: string;
}

interface AuthRequest {
    email: string;
    password: string;
}

export const loginRequest = async (email: string, password: string): Promise<UserToken> => {
    const loginRequest: AuthRequest = { email, password }
    const data = postApi<UserToken, AuthRequest>("https://crypto.johnturkson.com/login", loginRequest)
    return data;
}

export const signupRequest = async (email: string, password: string): Promise<UserToken> => {
    const loginRequest: AuthRequest = { email, password }
    const data = postApi<UserToken, AuthRequest>("https://crypto.johnturkson.com/signup", loginRequest)
    return data;
}
