import { dynamoDBClient } from "../resources/Clients"
import { ScanCommand } from "@aws-sdk/client-dynamodb"

export async function handler(event: any) {
    const command = new ScanCommand({
        TableName: "CryptoSupportedCurrencies"
    })
    
    return dynamoDBClient.send(command)
        .then(response => response.Items ?? [])
        .then(items => items.map(item => item.name.S))
}
