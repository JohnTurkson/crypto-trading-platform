export interface CreateUserResponse {
    readonly success: boolean
    readonly user?: string
    readonly token?: string
    readonly error?: string
}
