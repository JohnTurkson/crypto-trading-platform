import { getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"

export async function handler(event: any) {
    const body = getEventBody(event)
    
    const response = dynamoDBDocumentClient.query({
        TableName: "CryptoPortfolios",
        KeyConditionExpression: "#user = :user",
        ExpressionAttributeNames: {
            "#user": "user"
        },
        ExpressionAttributeValues: {
            ":user": body.user
        }
    })
    
    return response.then(response => response.Items ?? [])
}
