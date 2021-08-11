import { Withdrawal } from "../data/Withdrawal"

export interface WithdrawAssetResponse {
    readonly success: boolean
    readonly withdrawal?: Withdrawal
    readonly error?: string
}
