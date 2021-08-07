import { WithdrawAssetResponse } from "../../../server/src/responses/WithdrawAssetResponse"
import { generateConditionExpression, getEventBody } from "../resources/Utils"
import { WithdrawAssetRequest } from "../../../server/src/requests/WithdrawAssetRequest"
import { dynamoDBDocumentClient } from "../resources/Clients"
import Decimal from "decimal.js"

export async function handler(event: any): Promise<WithdrawAssetResponse> {
    const request = getEventBody(event) as WithdrawAssetRequest
    
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
            "id": request.portfolio
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
            portfolio: request.portfolio,
            name: request.asset
        }
    })
    
    const previousAmount = await asset.then(response => response.Item)
        .then(asset => asset?.amount ?? "0")
        .then(amount => new Decimal(amount))
    const depositAmount = new Decimal(request.amount)
    const totalAmount = previousAmount.minus(depositAmount)
    
    if (depositAmount.isNegative()) {
        return {
            success: false,
            error: "Invalid Amount"
        }
    }
    
    if (totalAmount.isNegative()) {
        return {
            success: false,
            error: "Insufficient Balance"
        }
    }
    
    const conditionExpression = generateConditionExpression(
        "#amount",
        "=",
        ":previousAmount",
        previousAmount.isZero() ? undefined : previousAmount.toString()
    )
    
    if (totalAmount.isZero()) {
        await dynamoDBDocumentClient.delete({
            TableName: "CryptoAssets",
            Key: {
                portfolio: request.portfolio,
                name: request.asset
            },
            ConditionExpression: conditionExpression,
            ExpressionAttributeNames: {
                "#amount": "amount"
            },
            ExpressionAttributeValues: {
                ":previousAmount": previousAmount,
                ":totalAmount": totalAmount
            }
        })
    } else {
        await dynamoDBDocumentClient.update({
            TableName: "CryptoAssets",
            Key: {
                portfolio: request.portfolio,
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
    }
    
    return {
        success: true
    }
}
