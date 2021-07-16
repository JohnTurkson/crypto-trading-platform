import { postApi } from "./DefaultRequest"

export interface UserToken {
    userId: string;
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

export const loginRequest = async (email: string, password: string): Promise<UserToken> => {
    const loginRequest: LoginRequest = { email, password }
    const data = postApi<UserToken, LoginRequest>("/login", loginRequest)
    return data;
} 