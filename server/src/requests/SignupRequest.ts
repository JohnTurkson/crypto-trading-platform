import Request from "./Request"

export default interface SignupRequest extends Request {
    readonly type: "SignupRequest",
    readonly name: string,
    readonly email: string,
    readonly password: string,
}
