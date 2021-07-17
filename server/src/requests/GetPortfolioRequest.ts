import Request from "./Request"

export default interface GetPortfolioRequest extends Request {
    readonly type: "CreatePortfolioRequest",
    readonly userId: string,
}