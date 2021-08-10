import { AssetData } from "./AssetData"

export interface Asset extends AssetData {
    readonly portfolio: string
    readonly name: string
    readonly amount: string
}
