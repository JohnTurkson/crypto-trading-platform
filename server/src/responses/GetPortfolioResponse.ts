import Portfolio from "../data/Portfolio";

export default interface GetPortfolioResponse {
    readonly portfolio: Portfolio,
    readonly type: "GetPortfolioResponse"
}
