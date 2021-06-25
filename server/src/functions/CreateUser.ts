import generateUserId from "./GenerateUserId"
import User from "../data/User"

export default async function createUser(name: string, email: string): Promise<User> {
    const id = await generateUserId()
    
    return {
        id: id,
        name: name,
        email: email,
    }
}
