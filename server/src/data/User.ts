import { UserData } from "./UserData"

export interface User extends UserData {
    readonly id: string
    readonly name: string
    readonly email: string
}
