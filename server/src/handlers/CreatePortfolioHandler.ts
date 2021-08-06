import DefaultHandler from "./DefaultHandler"
import { CreatePortfolioRequest } from "../requests/CreatePortfolioRequest"
import { CreatePortfolioResponse } from "../responses/CreatePortfolioResponse"

// TODO remove
export default class CreatePortfolioHandler extends DefaultHandler<CreatePortfolioRequest, CreatePortfolioResponse> {
    async validateRequest(request: any): Promise<CreatePortfolioRequest> {
        return request
    }

    async authenticateRequest(request: CreatePortfolioRequest): Promise<CreatePortfolioRequest> {
        return request
    }

    async authorizeRequest(request: CreatePortfolioRequest): Promise<CreatePortfolioRequest> {
        return request
    }

    async processRequest(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse> {
        return {
            id: "",
            user: "",
            name: "",
        }
        // const portfolio = await this.database.createPortfolio(request.userId)
        // return {
        //     portfolio: portfolio,
        //     type: "CreatePortfolioResponse",
        // }
    }
}
