import {getApi, postApi} from "./DefaultRequest"
import {ListPortfoliosResponse} from "../../../server/src/responses/ListPortfoliosResponse";
import {ListPortfoliosRequest} from "../../../server/src/requests/ListPortfoliosRequest";
import {ListPortfolioAssetsResponse} from "../../../server/src/responses/ListPortfolioAssetsResponse";
import {ListPortfolioAssetsRequest} from "../../../server/src/requests/ListPortfolioAssetsRequest";
import {CreateTradeResponse} from "../../../server/src/responses/CreateTradeResponse";
import {CreateTradeRequest} from "../../../server/src/requests/CreateTradeRequest";
import {ListTradesRequest} from "../../../server/src/requests/ListTradesRequest";
import {ListTradesResponse} from "../../../server/src/responses/ListTradesResponse";

export const getSupportedAssets = async (): Promise<string[]> => {
    return getApi<string[]>("/GetSupportedAssets")
}

export const getUserPortfolioIds = async (user: string): Promise<ListPortfoliosResponse> => {
    const portfolioRequest: ListPortfoliosRequest = {user}
    return postApi<ListPortfoliosResponse, ListPortfoliosRequest>("/ListPortfolios", portfolioRequest);
}

export const getPortfolioAssets = async (portfolio: string): Promise<ListPortfolioAssetsResponse> => {
    const portfolioRequest: ListPortfolioAssetsRequest = {portfolio}
    return postApi<ListPortfolioAssetsResponse, ListPortfolioAssetsRequest>("/ListPortfolioAssets", portfolioRequest);
}

export const createTrade = async(
    user: string,
    portfolio: string,
    ticker: string,
    type: string,
    amount: string,
    price: string) : Promise<CreateTradeResponse> => {

    const createTrade: CreateTradeRequest = {authorization: "", user, portfolio, ticker, type, amount, price}
    return postApi<CreateTradeResponse, CreateTradeRequest>("/CreateTrade", createTrade)
}

export const listTrades = async(portfolio: string) => {
    const listTradesRequest: ListTradesRequest = {authorization: "", portfolio: portfolio}
    return postApi<ListTradesResponse, ListTradesRequest>("/ListTrades", listTradesRequest);
}

export const subscribeToTradeRequest = async(user: string) => {

}