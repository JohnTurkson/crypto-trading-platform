import { PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi"
import { dataStreamClient, dynamoDBDocumentClient } from "../resources/Clients"
import { textEncoder } from "../resources/Tools"

export async function handler(event: any) {
    const updates: string[] = event.Records
        .map((record: any) => record.Sns.Message as string)
    
    const connections = await dynamoDBDocumentClient.scan({
        TableName: "CryptoDataStreamConnections"
    })
    
    const broadcasts = connections.Items?.flatMap(connection => {
        return updates.map(update => new PostToConnectionCommand({
                ConnectionId: connection.connectionId,
                Data: textEncoder.encode(update)
            })
        ).map(broadcastUpdateCommand => dataStreamClient.send(broadcastUpdateCommand))
    }) ?? []
    
    return Promise.all(broadcasts)
}
