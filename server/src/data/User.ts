import { UserData } from "./UserData"

export interface User extends UserData {
    readonly id: string
    readonly email: string
}
