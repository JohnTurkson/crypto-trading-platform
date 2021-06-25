import UserCredentials from "../data/UserCredentials"
import generatePasswordHash from "./GeneratePasswordHash"

export default async function createUserCredentials(id: string, password: string): Promise<UserCredentials> {
    const hash = await generatePasswordHash(password)
    return {
        id: id,
        password: hash,
    }
}
