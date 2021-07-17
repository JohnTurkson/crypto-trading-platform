import DefaultHandler from "./DefaultHandler"
import GetPortfolioRequest from "../requests/GetPortfolioRequest"
import GetPortfolioResponse from "../responses/GetPortfolioResponse"
import generateUserToken from "../functions/user/credentials/GenerateUserToken"
import ErrorResponse from "../responses/ErrorResponse"
import generatePasswordHash from "../functions/user/credentials/GeneratePasswordHash"

export default class CreatePortfolioHandler extends DefaultHandler<GetPortfolioRequest, GetPortfolioResponse> {
    async validateRequest(request: any): Promise<GetPortfolioRequest> {
        return request
    }

    async authenticateRequest(request: GetPortfolioRequest): Promise<GetPortfolioRequest> {
        return request
    }

    async authorizeRequest(request: GetPortfolioRequest): Promise<GetPortfolioRequest> {
        return request
    }

    async processRequest(request: GetPortfolioRequest): Promise<GetPortfolioResponse> {
        const portfolio = await this.database.getPortfolio(request.userId)
        return {
            portfolio: portfolio,
            type: "GetPortfolioResponse",
        }
    }
}
