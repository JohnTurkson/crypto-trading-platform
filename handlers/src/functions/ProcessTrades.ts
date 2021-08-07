import { dynamoDBDocumentClient } from "../resources/Clients"
import { Trade } from "../../../server/src/data/Trade"
import { PriceData } from "../../../data-stream/src/data/PriceData"
import Decimal from "decimal.js"

export async function handle(event: any) {
    const update = JSON.parse(event.Records[0].Sns.Message) as PriceData
    
    const openTrades = await dynamoDBDocumentClient.scan({
        TableName: "CryptoOpenTrades",
        FilterExpression: "#ticker = :ticker",
        ExpressionAttributeNames: {
            "#ticker": "ticker"
        },
        ExpressionAttributeValues: {
            ":ticker": update.asset
        }
    }).then(response => response?.Items ?? [])
    
    const processedTrades = openTrades.map(item => item as Trade)
        .map(async trade => {
            const price = new Decimal(trade.price)
            const closedTrade: Trade = {
                id: trade.id,
                status: "closed",
                portfolio: trade.portfolio,
                ticker: trade.ticker,
                type: trade.type,
                amount: trade.amount,
                price: update.price,
                time: Date.now()
            }
            
            if (trade.type === "buy" && price.greaterThanOrEqualTo(update.price)) {
                await dynamoDBDocumentClient.put({
                    TableName: "CryptoClosedTrades",
                    Item: closedTrade
                })
                
                await dynamoDBDocumentClient.delete({
                    TableName: "CryptoOpenTrades",
                    Key: {
                        "portfolio": trade.portfolio,
                        "id": trade.id
                    }
                })
            } else if (trade.type === "sell" && price.lessThanOrEqualTo(update.price)) {
                await dynamoDBDocumentClient.put({
                    TableName: "CryptoClosedTrades",
                    Item: closedTrade
                })
                
                await dynamoDBDocumentClient.delete({
                    TableName: "CryptoOpenTrades",
                    Key: {
                        "portfolio": trade.portfolio,
                        "id": trade.id
                    }
                })
            }
        })
    
    return Promise.all(processedTrades)
}
