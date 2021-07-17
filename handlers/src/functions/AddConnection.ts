import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { dynamoDBClient } from "../resources/Clients"

export async function handler(event: any) {
    const addConnectionCommand = new PutItemCommand({
        TableName: "CryptoDataStreamConnections",
        Item: {
            "connectionId": {S: event.requestContext.connectionId}
        }
    })
    
    await dynamoDBClient.send(addConnectionCommand)
    
    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
