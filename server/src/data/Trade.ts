import { TradeData } from "./TradeData"

export interface Trade extends TradeData {
    readonly id: string
    readonly status: string
    readonly user: string
    readonly portfolio: string
    readonly ticker: string
    readonly type: string
    readonly amount: string
    readonly price: string
    readonly time: number
}
