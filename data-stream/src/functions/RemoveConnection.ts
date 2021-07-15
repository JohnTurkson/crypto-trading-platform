import { DeleteItemCommand } from "@aws-sdk/client-dynamodb"
import { dynamoDBClient, mongoClient } from "./Clients"

export async function handler(event: any) {
    const removeConnectionCommand = new DeleteItemCommand({
        TableName: "CryptoDataStreamConnections",
        Key: {
            "connectionId": {S: event.requestContext.connectionId}
        }
    })

    await dynamoDBClient.send(removeConnectionCommand)
    await mongoClient.db("CryptoDataStream").collection("Connections")
        .deleteOne({"connectionId": event.requestContext.connectionId})

    // await databaseClient.send(addConnectionCommand)
    //
    // const commandInput: PostToConnectionCommandInput = {
    //     ConnectionId: "",
    //     Data: new TextEncoder().encode("Remove Connection"),
    // }
    // const command = new PostToConnectionCommand(commandInput)
    // await client.send(command)

    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
