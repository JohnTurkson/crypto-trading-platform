export interface WithdrawAssetRequest {
    readonly authorization: string
    readonly destination: string
    readonly asset: string
    readonly amount: string
}
