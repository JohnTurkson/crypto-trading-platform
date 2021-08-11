import { dynamoDBDocumentClient } from "../resources/Clients"

export async function handler(event: any) {
    await dynamoDBDocumentClient.delete({
        TableName: "CryptoDataStreamConnections",
        Key: {
            "connectionId": event.requestContext.connectionId
        }
    })
    
    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
