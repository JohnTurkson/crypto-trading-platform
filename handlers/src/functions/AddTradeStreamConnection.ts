import { dynamoDBDocumentClient } from "../resources/Clients"
import { getEventBody } from "../resources/Utils"
import { SubscribeToTradeUpdatesRequest } from "../../../server/src/requests/SubscribeToTradeUpdatesRequest"
import { UserToken } from "../../../server/src/data/UserToken"

export async function handler(event: any) {
    const request = getEventBody(event) as SubscribeToTradeUpdatesRequest
    
    const authorization = await dynamoDBDocumentClient.get({
        TableName: "CryptoUserTokens",
        Key: {
            "token": request.authorization
        }
    }).then(response => response.Item as UserToken ?? undefined)
    
    if (authorization === undefined || authorization.user !== request.user) {
        return {
            statusCode: "403",
            body: "Invalid Credentials"
        }
    } else {
        await dynamoDBDocumentClient.put({
            TableName: "CryptoTradeStreamConnections",
            Item: {
                "id": event.requestContext.connectionId,
                "user": request.user
            }
        })
        
        return {
            statusCode: "200",
            body: "Connected"
        }
    }
}
