import { dynamoDBDocumentClient } from "../resources/Clients"
import { getEventBody } from "../resources/Utils"
import { SubscribeToTradeUpdatesRequest } from "../../../server/src/requests/SubscribeToTradeUpdatesRequest"

export async function handler(event: any) {
    // TODO authenticate user
    const request = getEventBody(event) as SubscribeToTradeUpdatesRequest
    
    await dynamoDBDocumentClient.put({
        TableName: "CryptoTradeStreamConnections",
        Item: {
            "id": event.requestContext.connectionId,
            "user": request.user
        }
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
