import {getApi, postApi} from "./DefaultRequest"

export interface GetPortfolioRequest {
    userId: string
}

export interface PurchaseAssetRequest {
    userId: string,
    coinName: string,
    amountPurchased: string,
    price: string
}

export interface AssetData {
    coinName: string,
    amountOwned: string,
    price: string,
}

export interface PortfolioData {
    assets: AssetData[],
    userId: string,
    id: string
}

export const getPortfolioRequest = async (userId: string): Promise<PortfolioData> => {
    const portfolioRequest: GetPortfolioRequest = {userId}
    return getApi<PortfolioData, GetPortfolioRequest>("https://crypto.johnturkson.com/GetPortfolio", portfolioRequest);
}

export const purchaseAssetRequest = async(
     userId: string,
     coinName: string,
     amountPurchased: string,
     price: string) : Promise<AssetData> => {

    const purchaseRequest: PurchaseAssetRequest = {userId, coinName, amountPurchased, price}
    return postApi<AssetData, PurchaseAssetRequest>("https://crypto.johnturkson.com/PurchaseAsset", purchaseRequest)
}