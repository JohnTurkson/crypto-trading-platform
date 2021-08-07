import { WithdrawAssetResponse } from "../../../server/src/responses/WithdrawAssetResponse"
import { getEventBody } from "../resources/Utils"
import { WithdrawAssetRequest } from "../../../server/src/requests/WithdrawAssetRequest"

export async function handler(event: any): Promise<WithdrawAssetResponse> {
    const request = getEventBody(event) as WithdrawAssetRequest
    
    
    
    return {
        success: true
    }
}
