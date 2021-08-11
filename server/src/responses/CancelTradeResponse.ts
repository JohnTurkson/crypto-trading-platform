import { Trade } from "../data/Trade"

export interface CancelTradeResponse {
    readonly success: boolean
    readonly trade?: Trade
    readonly error?: string
}
