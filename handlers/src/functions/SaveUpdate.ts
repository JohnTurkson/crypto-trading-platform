import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { dynamoDBClient } from "../resources/Clients"

export async function handler(event: any) {
    const updates: string[] = event.Records
        .map((record: any) => record.Sns.Message as string)
    
    const commands = updates.map(update => JSON.parse(update))
        .map(update => new PutItemCommand({
            TableName: "CryptoData",
            Item: {
                "time": {N: update.time.toString()},
                "source": {S: update.source},
                "open": {S: update.open},
                "high": {S: update.high},
                "low": {S: update.low},
                "volume": {S: update.volume},
                "asset": {S: update.asset},
                "price": {S: update.price}
            }
        }))
        .map(command => dynamoDBClient.send(command))
    
    return Promise.all(commands)
}
