export interface LoginUserResponse {
    readonly success: boolean
    readonly user?: string
    readonly token?: string
    readonly error?: string
}
