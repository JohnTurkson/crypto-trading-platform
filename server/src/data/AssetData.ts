import Resource from "./Resource"
import Coin from "./Coin";

export default interface AssetData extends Resource {
    readonly name: string
    readonly amount: string
}
