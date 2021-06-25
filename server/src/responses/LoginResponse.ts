export default interface LoginResponse {
    readonly type: "LoginResponse"
    readonly id: string,
    readonly token: string,
}
