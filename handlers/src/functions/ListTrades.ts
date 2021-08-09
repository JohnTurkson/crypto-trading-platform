import { ListTradesResponse } from "../../../server/src/responses/ListTradesResponse"
import { getEventBody } from "../resources/Utils"
import { ListTradesRequest } from "../../../server/src/requests/ListTradesRequest"
import { dynamoDBDocumentClient } from "../resources/Clients"
import { Trade } from "../../../server/src/data/Trade"

export async function handler(event: any): Promise<ListTradesResponse> {
    const request = getEventBody(event) as ListTradesRequest
    
    const openTrades = dynamoDBDocumentClient.query({
        TableName: "CryptoOpenTrades",
        KeyConditionExpression: "#portfolio = :portfolio",
        ExpressionAttributeNames: {
            "#portfolio": "portfolio"
        },
        ExpressionAttributeValues: {
            ":portfolio": request.portfolio
        }
    })
    
    const closedTrades = dynamoDBDocumentClient.query({
        TableName: "CryptoClosedTrades",
        KeyConditionExpression: "#portfolio = :portfolio",
        ExpressionAttributeNames: {
            "#portfolio": "portfolio"
        },
        ExpressionAttributeValues: {
            ":portfolio": request.portfolio
        }
    })
    
    const cancelledTrades = dynamoDBDocumentClient.query({
        TableName: "CryptoCancelledTrades",
        KeyConditionExpression: "#portfolio = :portfolio",
        ExpressionAttributeNames: {
            "#portfolio": "portfolio"
        },
        ExpressionAttributeValues: {
            ":portfolio": request.portfolio
        }
    })

    return Promise.all([openTrades, closedTrades, cancelledTrades])
        .then(responses => responses.flatMap(response => response.Items ?? []))
        .then(items => items as Trade[])
}
