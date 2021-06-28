import Resource from "./Resource"

export default interface UserCredentials extends Resource {
    readonly user: string,
    readonly password: string,
}
