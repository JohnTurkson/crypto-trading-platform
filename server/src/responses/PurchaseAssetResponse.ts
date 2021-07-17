import AssetData from "../data/AssetData";

export default interface PurchaseAssetResponse {
    readonly asset: AssetData,
    readonly type: "PurchaseAssetResponse"
}
