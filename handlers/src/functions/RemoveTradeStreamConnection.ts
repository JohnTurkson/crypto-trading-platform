import { dynamoDBDocumentClient } from "../resources/Clients"

export async function handler(event: any) {
    await dynamoDBDocumentClient.delete({
        TableName: "CryptoTradeStreamConnections",
        Key: {
            "id": event.requestContext.connectionId
        }
    })
    
    return {
        statusCode: 200,
        body: "Disconnected"
    }
}
