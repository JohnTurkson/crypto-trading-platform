import { Deposit } from "../data/Deposit"

export interface DepositAssetResponse {
    readonly success: boolean
    readonly deposit?: Deposit
    readonly error?: string
}
