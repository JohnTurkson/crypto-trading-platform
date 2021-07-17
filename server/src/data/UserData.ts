import Resource from "./Resource"

export default interface UserData extends Resource {
    readonly name: string,
    readonly email: string,
}
