export default interface LoginRequest {
    readonly type: "LoginRequest",
    readonly email: string,
    readonly password: string,
}
