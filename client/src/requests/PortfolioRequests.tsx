import { postApi } from "./DefaultRequest"
import Portfolio from "../../../server/src/data/Portfolio"
import { CreatePortfolioRequest } from "../../../server/src/requests/CreatePortfolioRequest"
import { ListPortfoliosRequest } from "../../../server/src/requests/ListPortfoliosRequest"
import { CreatePortfolioResponse } from "../../../server/src/responses/CreatePortfolioResponse"

export const createPortfolioRequest = async (user: string, name: string): Promise<Portfolio> => {
    const request: CreatePortfolioRequest = { user, name }
    const data = await postApi<CreatePortfolioResponse, CreatePortfolioRequest>("/CreatePortfolio", request)
    const portfolio: Portfolio = (({ user, id, name }) => ({ user, id, name }))(data)
    return portfolio
}

export const getPortfoliosRequest = async (user: string): Promise<Portfolio[]> => {
    const request: ListPortfoliosRequest = { user }
    const data = postApi<Portfolio[], ListPortfoliosRequest>("/ListPortfolios", request)
    return data
}