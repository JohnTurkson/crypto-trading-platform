import { dynamoDBDocumentClient, tradeStreamClient } from "../resources/Clients"
import { PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi"
import { textEncoder } from "../resources/Tools"
import { Trade } from "../../../server/src/data/Trade"

export async function handler(event: any) {
    const update = JSON.parse(event.Records[0].Sns.Message) as Trade
    
    const response = await dynamoDBDocumentClient.query({
        TableName: "CryptoTradeStreamConnections",
        IndexName: "CryptoTradeStreamConnectionsUserIndex",
        KeyConditionExpression: "#user = :user",
        ExpressionAttributeNames: {
            "#user": "user"
        },
        ExpressionAttributeValues: {
            ":user": update.user
        }
    })
    
    const connections = response.Items ?? []
    
    for (const connection of connections) {
        await tradeStreamClient.send(new PostToConnectionCommand({
            ConnectionId: connection.id,
            Data: textEncoder.encode(JSON.stringify(update))
        })).catch(() => dynamoDBDocumentClient.delete({
            TableName: "CryptoTradeStreamConnections",
            Key: {
                "id": connection.id
            }
        }))
    }
}
