import { getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import Portfolio from "../../../server/src/data/Portfolio"
import { ListPortfoliosResponse } from "../../../server/src/responses/ListPortfoliosResponse"

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
    
    return response.then(response => response.Items ?? []) as Promise<Portfolio[]>
}
