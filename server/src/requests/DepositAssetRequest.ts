export interface DepositAssetRequest {
    readonly authorization: string
    readonly user: string
    readonly portfolio: string
    readonly asset: string
    readonly amount: string
}
