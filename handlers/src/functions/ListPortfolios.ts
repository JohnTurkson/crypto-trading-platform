import { getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import ListPortfoliosResponse from "../../../server/src/responses/ListPortfoliosResponse"
import Portfolio from "../../../server/src/data/Portfolio"

export async function handler(event: any): Promise<ListPortfoliosResponse> {
    const request = getEventBody(event)
    
    const response = dynamoDBDocumentClient.query({
        TableName: "CryptoPortfolios",
        KeyConditionExpression: "#user = :user",
        ExpressionAttributeNames: {
            "#user": "user"
        },
        ExpressionAttributeValues: {
            ":user": request.user
        }
    })
    
    const items = await response
        .then(response => response.Items ?? [])
        .then(items => items as Portfolio[])
    
    return {
        type: "ListPortfoliosResponse",
        portfolios: items
    }
}
