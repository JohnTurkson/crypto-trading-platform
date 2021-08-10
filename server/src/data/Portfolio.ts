import { PortfolioData } from "./PortfolioData"

export interface Portfolio extends PortfolioData {
    readonly id: string
    readonly user: string
    readonly name: string
}
