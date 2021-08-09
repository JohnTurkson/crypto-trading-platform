import { dynamoDBDocumentClient } from "../resources/Clients"

export async function handler(event: any) {
    const updates: string[] = event.Records
        .map((record: any) => record.Sns.Message as string)
    
    const commands = updates.map(update => JSON.parse(update))
        .map(update => dynamoDBDocumentClient.put({
            TableName: "CryptoData",
            Item: {
                "time": update.time,
                "source": update.source,
                "open": update.open,
                "high": update.high,
                "low": update.low,
                "volume": update.volume,
                "asset": update.asset,
                "price": update.price
            }
        }))
    
    return Promise.all(commands)
}
