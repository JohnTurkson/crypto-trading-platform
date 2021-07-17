import Resource from "./Resource"

export default interface UserToken extends Resource {
    readonly userId: string,
    readonly token: string,
}
