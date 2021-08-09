import { postApi } from "./DefaultRequest"

export interface UserToken {
    userId: string;
    token: string;
}

interface AuthRequest {
    email: string;
    password: string;
}

export const loginRequest = async (email: string, password: string): Promise<UserToken> => {
    const loginRequest: AuthRequest = { email, password }
    const data = postApi<UserToken, AuthRequest>("/login", loginRequest)
    return data;
}

export const signupRequest = async (email: string, password: string): Promise<UserToken> => {
    const loginRequest: AuthRequest = { email, password }
    const data = postApi<UserToken, AuthRequest>("/signup", loginRequest)
    return data;
}
