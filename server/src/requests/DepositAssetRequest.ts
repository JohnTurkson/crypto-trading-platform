export interface DepositAssetRequest {
    readonly authorization: string
    readonly destination: string
    readonly asset: string
    readonly amount: string
}
