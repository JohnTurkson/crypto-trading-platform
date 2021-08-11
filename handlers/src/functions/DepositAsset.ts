import { generateConditionExpression, generateId, getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import { DepositAssetRequest } from "../../../server/src/requests/DepositAssetRequest"
import { DepositAssetResponse } from "../../../server/src/responses/DepositAssetResponse"
import Decimal from "decimal.js"
import { UserToken } from "../../../server/src/data/UserToken"

export async function handler(event: any): Promise<DepositAssetResponse> {
    const request = getEventBody(event) as DepositAssetRequest
    
    if (request.authorization === undefined || request.authorization === "") {
        return {
            success: false,
            error: "Invalid Credentials"
        }
    }
    
    const authorization = await dynamoDBDocumentClient.get({
        TableName: "CryptoUserTokens",
        Key: {
            "token": request.authorization
        }
    }).then(response => response.Item as UserToken ?? undefined)
    
    if (authorization === undefined || authorization.user !== request.user) {
        return {
            success: false,
            error: "Invalid Credentials"
        }
    }
    
    if (Number.isNaN(request.amount)) {
        return {
            success: false,
            error: "Invalid Amount"
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
    
    const asset = dynamoDBDocumentClient.get({
        TableName: "CryptoAssets",
        Key: {
            "portfolio": request.portfolio,
            "name": request.asset
        }
    })
    
    const previousAmount = await asset.then(response => response.Item)
        .then(asset => asset?.amount ?? "0")
        .then(amount => new Decimal(amount))
    const depositAmount = new Decimal(request.amount)
    const totalAmount = previousAmount.plus(depositAmount)
    
    if (depositAmount.isNegative() || depositAmount.isZero()) {
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
            "portfolio": request.portfolio,
            "name": request.asset
        },
        ConditionExpression: conditionExpression,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: {
            "#amount": "amount"
        },
        ExpressionAttributeValues: {
            ":previousAmount": previousAmount.isZero() ? undefined : previousAmount.toString(),
            ":totalAmount": totalAmount.toString()
        }
    })
    
    const deposit = {
        id: generateId(),
        user: request.user,
        portfolio: request.portfolio,
        asset: request.asset,
        amount: request.amount
    }
    
    await dynamoDBDocumentClient.put({
        TableName: "CryptoDeposits",
        Item: deposit
    })
    
    return {
        success: true,
        deposit: deposit
    }
}
