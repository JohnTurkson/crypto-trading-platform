import Request from "./Request"

export default interface GetPortfolioRequest extends Request {
    readonly type: "GetPortfolioRequest",
    readonly userId: string,
}