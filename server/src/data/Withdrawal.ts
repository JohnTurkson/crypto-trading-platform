import { WithdrawalData } from "./WithdrawalData"

export interface Withdrawal extends WithdrawalData {
    readonly id: string
    readonly portfolio: string
    readonly asset: string
    readonly amount: string
}
