import { generateConditionExpression, getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import { DepositAssetRequest } from "../../../server/src/requests/DepositAssetRequest"
import { DepositAssetResponse } from "../../../server/src/responses/DepositAssetResponse"
import Decimal from "decimal.js"

export async function handler(event: any): Promise<DepositAssetResponse> {
    const request = getEventBody(event) as DepositAssetRequest
    
    // TODO get user from api token
    const user = "1"
    
    const portfolio = dynamoDBDocumentClient.get({
        TableName: "CryptoPortfolios",
        Key: {
            "user": user,
            "id": request.destination
        }
    })
    
    if (await portfolio.then(response => response.Item) === undefined) {
        return {
            success: false,
            error: "Invalid Portfolio"
        }
    }
    
    const asset = dynamoDBDocumentClient.get({
        TableName: "CryptoAssets",
        Key: {
            portfolio: request.destination,
            name: request.asset
        }
    })
    
    const previousAmount = await asset.then(response => response.Item).then(asset => asset?.amount)
    const totalAmount = new Decimal(previousAmount ?? "0").plus(new Decimal(request.amount)).toString()
    const conditionExpression = generateConditionExpression(
        "#amount",
        "=",
        ":previousAmount",
        previousAmount
    )
    
    await dynamoDBDocumentClient.update({
        TableName: "CryptoAssets",
        Key: {
            portfolio: request.destination,
            name: request.asset
        },
        ConditionExpression: conditionExpression,
        UpdateExpression: "SET #amount = :totalAmount",
        ExpressionAttributeNames: {
            "#amount": "amount"
        },
        ExpressionAttributeValues: {
            ":previousAmount": previousAmount,
            ":totalAmount": totalAmount
        }
    })
    
    return {
        success: true
    }
}
