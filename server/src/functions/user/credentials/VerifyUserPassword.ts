import bcrypt from "bcryptjs"
import { UserCredentials } from "../../../data/UserCredentials"

export default async function verifyUserPassword(
    userCredentials: UserCredentials,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, userCredentials.password)
}
