import { dynamoDBDocumentClient } from "../resources/Clients"

export async function handler(event: any) {
    const response = dynamoDBDocumentClient.scan({
        TableName: "CryptoSupportedCurrencies"
    })
    
    return response
        .then(response => response.Items ?? [])
        .then(items => items.map(item => item.name))
}
