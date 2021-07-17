export default interface LoginResponse {
    readonly type: "LoginResponse"
    readonly userId: string,
    readonly token: string,
}
