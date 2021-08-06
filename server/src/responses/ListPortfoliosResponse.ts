import Portfolio from "../data/Portfolio"

export default interface ListPortfoliosResponse {
    readonly type: "ListPortfoliosResponse"
    readonly portfolios: Portfolio[]
}
