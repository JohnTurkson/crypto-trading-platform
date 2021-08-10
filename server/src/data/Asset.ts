import AssetData from "./AssetData"

export default interface Asset extends AssetData {
    readonly portfolio: string
    readonly name: string
    readonly amount: string
}
