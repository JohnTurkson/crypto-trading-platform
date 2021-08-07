import { Trade } from "../data/Trade"

export interface TradeResponse {
    readonly success: boolean
    readonly trade?: Trade
    readonly error?: string
}
