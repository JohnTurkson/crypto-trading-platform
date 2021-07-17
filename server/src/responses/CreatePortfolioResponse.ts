import Portfolio from "../data/Portfolio";

export default interface CreatePortfolioResponse {
    readonly portfolio: Portfolio,
    readonly type: "CreatePortfolioResponse"
}
