import { DeleteItemCommand } from "@aws-sdk/client-dynamodb"
import { dynamoDBClient } from "../resources/Clients"

export async function handler(event: any) {
    const removeConnectionCommand = new DeleteItemCommand({
        TableName: "CryptoDataStreamConnections",
        Key: {
            "connectionId": {S: event.requestContext.connectionId}
        }
    })

    await dynamoDBClient.send(removeConnectionCommand)

    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
