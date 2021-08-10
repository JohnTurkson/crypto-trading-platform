import { Trade } from "../data/Trade"

export interface CreateTradeResponse {
    readonly success: boolean
    readonly trade?: Trade
    readonly error?: string
}
