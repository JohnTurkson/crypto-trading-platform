import Resource from "./Resource"
import UserData from "./UserData"

export default interface User extends Resource, UserData {
    readonly id: string,
    readonly name: string,
    readonly email: string,
}
