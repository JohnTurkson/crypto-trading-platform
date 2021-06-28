import Resource from "./Resource"

export default interface User extends Resource {
    readonly id: string,
    readonly name: string,
    readonly email: string,
}
