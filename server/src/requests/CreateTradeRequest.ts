export interface CreateTradeRequest {
    readonly authorization: string
    readonly user: string
    readonly portfolio: string
    readonly ticker: string
    readonly type: string
    readonly amount: string
    readonly price: string
}
