import { generateConditionExpression, getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import { DepositAssetRequest } from "../../../server/src/requests/DepositAssetRequest"
import { DepositAssetResponse } from "../../../server/src/responses/DepositAssetResponse"
import Decimal from "decimal.js"

export async function handler(event: any): Promise<DepositAssetResponse> {
    const request = getEventBody(event) as DepositAssetRequest
    
    if (Number.isNaN(request.amount)) {
        return {
            success: false,
            error: "Invalid Amount"
        }
    }
    
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
    
    const previousAmount = await asset.then(response => response.Item)
        .then(asset => asset?.amount ?? "0")
        .then(amount => new Decimal(amount))
    const depositAmount = new Decimal(request.amount)
    const totalAmount = previousAmount.plus(depositAmount)
    
    if (depositAmount.isNegative()) {
        return {
            success: false,
            error: "Invalid Amount"
        }
    }
    
    const conditionExpression = generateConditionExpression(
        "#amount",
        "=",
        ":previousAmount",
        previousAmount.isZero() ? undefined : previousAmount.toString()
    )
    
    const updateExpression = "SET #amount = :totalAmount"
    
    await dynamoDBDocumentClient.update({
        TableName: "CryptoAssets",
        Key: {
            portfolio: request.destination,
            name: request.asset
        },
        ConditionExpression: conditionExpression,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: {
            "#amount": "amount"
        },
        ExpressionAttributeValues: {
            ":previousAmount": previousAmount.toString(),
            ":totalAmount": totalAmount.toString()
        }
    })
    
    return {
        success: true
    }
}
