export default interface SignupResponse {
    readonly type: "SignupResponse",
    readonly userId: string,
    readonly token: string,
}
