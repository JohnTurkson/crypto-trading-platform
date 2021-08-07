import { TradeData } from "./TradeData"

export interface Trade extends TradeData {
    readonly id: string
    readonly portfolio: string
    readonly ticker: string
    readonly price: string
    readonly amount: string
}
