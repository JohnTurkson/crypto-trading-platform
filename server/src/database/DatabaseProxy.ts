import User from "../data/User"
import UserToken from "../data/UserToken"
import UserCredentials from "../data/UserCredentials"
import { ResourceFilter } from "../data/filters/ResourceFilter"

export default interface DatabaseProxy {
    createUser(name: string, email: string, password: string): Promise<User>

    createUserToken(userId: string, token: string): Promise<UserToken>

    getUser(filter: ResourceFilter<User>): Promise<User | null>

    getUserCredentials(filter: ResourceFilter<UserCredentials>): Promise<UserCredentials | null>
}
