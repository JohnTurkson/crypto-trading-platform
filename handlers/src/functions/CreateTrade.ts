import { CreateTradeResponse } from "../../../server/src/responses/CreateTradeResponse"
import { generateId, getEventBody } from "../resources/Utils"
import { CreateTradeRequest } from "../../../server/src/requests/CreateTradeRequest"
import { dynamoDBDocumentClient, snsClient } from "../resources/Clients"
import Decimal from "decimal.js"
import { PublishCommand } from "@aws-sdk/client-sns"

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
    
    const portfolio = dynamoDBDocumentClient.get({
        TableName: "CryptoPortfolios",
        Key: {
            "user": request.user,
            "id": request.portfolio
        }
    })
    
    if (await portfolio.then(response => response.Item) === undefined) {
        return {
            success: false,
            error: "Invalid Portfolio"
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
    
    await snsClient.send(new PublishCommand({
        TopicArn: process.env.TRADE_STREAM_TOPIC!,
        Message: JSON.stringify(trade)
    }))
    
    return {
        success: true,
        trade: trade
    }
}
