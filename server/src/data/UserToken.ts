import Resource from "./Resource"

export default interface UserToken extends Resource {
    readonly user: string,
    readonly token: string,
}
