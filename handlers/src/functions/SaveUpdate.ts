import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { dynamoDBClient } from "../resources/Clients"

export async function handler(event: any) {
    // TODO types
    const updates: string[] = event.Records
        .map((record: any) => record.Sns.Message as string)
    
    const commands = updates.map(update => JSON.parse(update))
        .map(update => new PutItemCommand({
            TableName: "CryptoData",
            Item: {
                "time": {N: update.time.toString()},
                "source": {S: update.source},
                "currency": {S: update.currency},
                "price": {S: update.price}
            }
        }))
        .map(command => dynamoDBClient.send(command))
    
    return Promise.all(commands)
}
