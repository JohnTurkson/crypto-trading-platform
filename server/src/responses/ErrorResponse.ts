import Response from "./Response"

export default interface ErrorResponse extends Response {
    readonly type: "ErrorResponse",
    readonly message: string,
}
