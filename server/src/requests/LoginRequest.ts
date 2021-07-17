import Request from "./Request"

export default interface LoginRequest extends Request {
    readonly type: "LoginRequest",
    readonly email: string,
    readonly password: string,
}
