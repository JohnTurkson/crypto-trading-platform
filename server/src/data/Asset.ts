import Resource from "./Resource"
import Coin from "./Coin";
import AssetData from "./AssetData";

export default interface Asset extends AssetData, Resource {
    readonly id: string,
    readonly coinName: string,
    readonly amountOwned: string,
}
