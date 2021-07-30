import Resource from "./Resource"
import Coin from "./Coin";

export default interface AssetData extends Resource {
    readonly coinName: string,
    readonly amountOwned: string,
    readonly price: string,
}
