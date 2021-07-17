import User from "../data/User"
import UserToken from "../data/UserToken"
import UserCredentials from "../data/UserCredentials"
import { ResourceFilter } from "../data/filters/ResourceFilter"
import Portfolio from "../data/Portfolio";
import AssetData from "../data/AssetData";
import Coin from "../data/Coin";

export default interface DatabaseProxy {
    createUser(name: string, email: string, password: string): Promise<User>

    createUserToken(userId: string, token: string): Promise<UserToken>

    getUser(filter: ResourceFilter<User>): Promise<User | undefined>

    getUserCredentials(filter: ResourceFilter<UserCredentials>): Promise<UserCredentials | undefined>

    createPortfolio(userId: string): Promise<Portfolio>
    purchaseAsset(userId: string, coinName: string, amountPurchased: string): Promise<AssetData>
    getPortfolio(userId: string): Promise<Portfolio>
}
