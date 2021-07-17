import { PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi"
import { ScanCommand } from "@aws-sdk/client-dynamodb"
import { apiGatewayManagementApiClient, dynamoDBClient } from "../resources/Clients"
import { textEncoder } from "../resources/Tools"

export async function handler(event: any) {
    // TODO types
    const updates: string[] = event.Records
        .map((record: any) => record.Sns.Message as string)
    
    const getConnectionsCommand = new ScanCommand({
        TableName: "CryptoDataStreamConnections"
    })
    const connections = await dynamoDBClient.send(getConnectionsCommand)
    
    const broadcasts = connections.Items?.flatMap(connection => {
        return updates.map(update => new PostToConnectionCommand({
                ConnectionId: connection.connectionId.S,
                Data: textEncoder.encode(update)
            })
        ).map(broadcastUpdateCommand => apiGatewayManagementApiClient.send(broadcastUpdateCommand))
    }) ?? []
    
    return Promise.all(broadcasts)
}
