import { postApi } from "./DefaultRequest"

export interface CreatePortfolioRequest {
    user: string
    name: string
}

export interface Portfolio {
    id: string
    user: string
    name: string
}

export const createPortfolioRequest = async (user: string, name: string): Promise<Portfolio> => {
    const request: CreatePortfolioRequest = { user, name }
    const data = postApi<Portfolio, CreatePortfolioRequest>("/CreatePortfolio", request)
    return data
}