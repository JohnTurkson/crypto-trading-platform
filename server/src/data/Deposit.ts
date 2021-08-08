import { DepositData } from "./DepositData"

export interface Deposit extends DepositData {
    readonly id: string
    readonly user: string
    readonly portfolio: string
    readonly asset: string
    readonly amount: string
}
