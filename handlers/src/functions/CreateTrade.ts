import { CreateTradeResponse } from "../../../server/src/responses/CreateTradeResponse"
import { generateId, getEventBody } from "../resources/Utils"
import { CreateTradeRequest } from "../../../server/src/requests/CreateTradeRequest"
import { dynamoDBDocumentClient } from "../resources/Clients"
import Decimal from "decimal.js"

export async function handler(event: any): Promise<CreateTradeResponse> {
    // TODO authenticate user
    const request = getEventBody(event) as CreateTradeRequest
    
    if (Number.isNaN(request.amount)) {
        return {
            success: false,
            error: "Invalid Amount"
        }
    }
    
    if (Number.isNaN(request.price)) {
        return {
            success: false,
            error: "Invalid Price"
        }
    }
    
    const amount = new Decimal(request.amount)
    const price = new Decimal(request.price)
    
    if (amount.isNegative() || amount.isZero()) {
        return {
            success: false,
            error: "Invalid Amount"
        }
    }
    
    if (price.isNegative() || price.isZero()) {
        return {
            success: false,
            error: "Invalid Price"
        }
    }
    
    const trade = {
        id: generateId(),
        status: "open",
        user: request.user,
        portfolio: request.portfolio,
        ticker: request.ticker,
        type: request.type,
        amount: request.amount,
        price: request.price,
        time: Date.now()
    }
    
    await dynamoDBDocumentClient.put({
        TableName: "CryptoOpenTrades",
        Item: trade
    })
    
    return {
        success: true,
        trade: trade
    }
}
