import DefaultHandler from "./DefaultHandler"
import PurchaseAssetRequest from "../requests/PurchaseAssetRequest"
import PurchaseAssetResponse from "../responses/PurchaseAssetResponse"
import generateUserToken from "../functions/user/credentials/GenerateUserToken"
import ErrorResponse from "../responses/ErrorResponse"
import generatePasswordHash from "../functions/user/credentials/GeneratePasswordHash"

export default class PurchaseAssetHandler extends DefaultHandler<PurchaseAssetRequest, PurchaseAssetResponse> {
    async validateRequest(request: any): Promise<PurchaseAssetRequest> {
        return request
    }

    async authenticateRequest(request: PurchaseAssetRequest): Promise<PurchaseAssetRequest> {
        return request
    }

    async authorizeRequest(request: PurchaseAssetRequest): Promise<PurchaseAssetRequest> {
        return request
    }

    async processRequest(request: PurchaseAssetRequest): Promise<PurchaseAssetResponse> {
        const asset = await this.database.purchaseAsset(request.userId, request.coinName, request.amountPurchased)
        return {
            asset: asset,
            type: "PurchaseAssetResponse",
        }
    }
}
