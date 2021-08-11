import DefaultHandler from "./DefaultHandler"
import { ListPortfoliosRequest } from "../requests/ListPortfoliosRequest"
import { ListPortfoliosResponse } from "../responses/ListPortfoliosResponse"

export default class GetPortfolioHandler extends DefaultHandler<ListPortfoliosRequest, ListPortfoliosResponse> {
    async validateRequest(request: any): Promise<ListPortfoliosRequest> {
        return request
    }
    
    async authenticateRequest(request: ListPortfoliosRequest): Promise<ListPortfoliosRequest> {
        return request
    }
    
    async authorizeRequest(request: ListPortfoliosRequest): Promise<ListPortfoliosRequest> {
        return request
    }
    
    async processRequest(request: ListPortfoliosRequest): Promise<ListPortfoliosResponse> {
        return await this.database.listPortfolios(request.user)
    }
}
