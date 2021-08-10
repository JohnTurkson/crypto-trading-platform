import { Portfolio } from "../../../server/src/data/Portfolio"
import { Asset } from "../../../server/src/data/Asset"
import { CreatePortfolioRequest } from "../../../server/src/requests/CreatePortfolioRequest"
import { CreatePortfolioResponse } from "../../../server/src/responses/CreatePortfolioResponse"
import { getApi, postApi } from "./DefaultRequest"
import { ListPortfoliosResponse } from "../../../server/src/responses/ListPortfoliosResponse"
import { ListPortfoliosRequest } from "../../../server/src/requests/ListPortfoliosRequest"
import { ListPortfolioAssetsResponse } from "../../../server/src/responses/ListPortfolioAssetsResponse"
import { ListPortfolioAssetsRequest } from "../../../server/src/requests/ListPortfolioAssetsRequest"
import { CreateTradeResponse } from "../../../server/src/responses/CreateTradeResponse"
import { CreateTradeRequest } from "../../../server/src/requests/CreateTradeRequest"
import { ListTradesRequest } from "../../../server/src/requests/ListTradesRequest"
import { ListTradesResponse } from "../../../server/src/responses/ListTradesResponse"


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

export const getPortfolioDataRequest = async (portfolio: string): Promise<Asset[]> => {
    const request: ListPortfolioAssetsRequest = { portfolio }
    const data = postApi<Asset[], ListPortfolioAssetsRequest>("/ListPortfolioAssets", request)
    return data
}

export const getSupportedAssets = async (): Promise<string[]> => {
    return getApi<string[]>("/GetSupportedAssets")
}

export const getUserPortfolioIds = async (user: string): Promise<ListPortfoliosResponse> => {
    const portfolioRequest: ListPortfoliosRequest = {user: user}
    return postApi<ListPortfoliosResponse, ListPortfoliosRequest>("/ListPortfolios", portfolioRequest)
}

export const getPortfolioAssets = async (portfolio: string): Promise<ListPortfolioAssetsResponse> => {
    const portfolioRequest: ListPortfolioAssetsRequest = {portfolio: portfolio}
    return postApi<ListPortfolioAssetsResponse, ListPortfolioAssetsRequest>("/ListPortfolioAssets", portfolioRequest)
}

export const createTrade = async (
    user: string,
    authorization: string,
    portfolio: string,
    ticker: string,
    type: string,
    amount: string,
    price: string): Promise<CreateTradeResponse> => {

    const createTrade: CreateTradeRequest = {
        authorization: authorization,
        user: user,
        portfolio: portfolio,
        ticker: ticker,
        type: type,
        amount: amount,
        price: price
    }
    return postApi<CreateTradeResponse, CreateTradeRequest>("/CreateTrade", createTrade)
}

export const listTrades = async (user: string, portfolio: string, authorization: string) => {
    const listTradesRequest: ListTradesRequest = {user: user, authorization: authorization, portfolio: portfolio}
    console.log(listTradesRequest)
    return postApi<ListTradesResponse, ListTradesRequest>("/ListTrades", listTradesRequest)
}