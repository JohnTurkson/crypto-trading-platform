import { dynamoDBDocumentClient } from "../resources/Clients"

export async function handler(event: any) {
    await dynamoDBDocumentClient.put({
        TableName: "CryptoDataStreamConnections",
        Item: {
            "connectionId": event.requestContext.connectionId
        }
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
