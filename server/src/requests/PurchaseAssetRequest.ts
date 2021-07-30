import Request from "./Request"
import Coin from "../data/Coin";

export default interface PurchaseAssetRequest extends Request {
    readonly type: "PurchaseAssetRequest",
    readonly userId: string,
    readonly coinName: string,
    readonly amountPurchased: string,
    readonly price: string,
}