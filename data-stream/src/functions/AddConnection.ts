import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { dynamoDBClient, mongoClient } from "./Clients"
import { MongoClient } from "mongodb"

const a = new MongoClient('a')

export async function handler(event: any) {
    const addConnectionCommand = new PutItemCommand({
        TableName: "CryptoDataStreamConnections",
        Item: {
            "connectionId": {S: event.requestContext.connectionId}
        }
    })
    await dynamoDBClient.send(addConnectionCommand)
    
    await mongoClient.db("CryptoDataStream").collection("Connections")
        .insertOne({"connectionId": event.requestContext.connectionId})

    // const commandInput: PostToConnectionCommandInput = {
    //     ConnectionId: "",
    //     Data: new TextEncoder().encode("AddConnection"),
    // }
    // const command = new PostToConnectionCommand(commandInput)
    // await client.send(command)

    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
