import { dynamoDBDocumentClient } from "../resources/Clients"
import { Trade } from "../../../server/src/data/Trade"
import { PriceData } from "../../../data-stream/src/data/PriceData"
import Decimal from "decimal.js"
import Asset from "../../../server/src/data/Asset"
import { generateConditionExpression } from "../resources/Utils"

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
    
    console.log(openTrades)
    
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
            
            const [assetName, currencyName] = trade.ticker.split("-")
            const totalPrice = new Decimal(update.price).times(trade.amount)
            
            const asset = await dynamoDBDocumentClient.get({
                TableName: "CryptoAssets",
                Key: {
                    "portfolio": trade.portfolio,
                    "name": assetName
                }
            }).then(response => response.Item as Asset | undefined)
            
            const currency = await dynamoDBDocumentClient.get({
                TableName: "CryptoAssets",
                Key: {
                    "portfolio": trade.portfolio,
                    "name": currencyName
                }
            }).then(response => response.Item as Asset | undefined)
            
            if (trade.type === "buy" && price.lessThanOrEqualTo(update.price)) {
                const previousAssetBalance = new Decimal(asset?.amount ?? "0")
                const totalAssetBalance = previousAssetBalance.plus(trade.amount)
                
                const previousCurrencyBalance = new Decimal(currency?.amount ?? "0")
                const totalCurrencyBalance = previousCurrencyBalance.minus(totalPrice)
                
                if (!totalAssetBalance.isNegative() && !totalCurrencyBalance.isNegative()) {
                    const assetConditionExpression = generateConditionExpression(
                        "#amount",
                        "=",
                        ":previousAmount",
                        previousAssetBalance.isZero() ? undefined : previousAssetBalance.toString()
                    )

                    const currencyConditionExpression = generateConditionExpression(
                        "#amount",
                        "=",
                        ":previousAmount",
                        previousCurrencyBalance.isZero() ? undefined : previousCurrencyBalance.toString()
                    )
    
                    await dynamoDBDocumentClient.update({
                        TableName: "CryptoAssets",
                        Key: {
                            "portfolio": trade.portfolio,
                            "name": assetName
                        },
                        ConditionExpression: assetConditionExpression,
                        UpdateExpression: "SET #amount = :totalAmount",
                        ExpressionAttributeNames: {
                            "#amount": "amount"
                        },
                        ExpressionAttributeValues: {
                            ":previousAmount": previousAssetBalance.toString(),
                            ":totalAmount": totalAssetBalance.toString()
                        }
                    })
                    
                    if (totalCurrencyBalance.isPositive()) {
                        await dynamoDBDocumentClient.update({
                            TableName: "CryptoAssets",
                            Key: {
                                "portfolio": trade.portfolio,
                                "name": currencyName
                            },
                            ConditionExpression: currencyConditionExpression,
                            UpdateExpression: "SET #amount = :totalAmount",
                            ExpressionAttributeNames: {
                                "#amount": "amount"
                            },
                            ExpressionAttributeValues: {
                                ":previousAmount": previousCurrencyBalance.toString(),
                                ":totalAmount": totalCurrencyBalance.toString()
                            }
                        })
                    } else if (totalCurrencyBalance.isZero()) {
                        await dynamoDBDocumentClient.delete({
                            TableName: "CryptoAssets",
                            Key: {
                                "portfolio": trade.portfolio,
                                "name": currencyName
                            },
                            ConditionExpression: currencyConditionExpression,
                            ExpressionAttributeNames: {
                                "#amount": "amount"
                            },
                            ExpressionAttributeValues: {
                                ":previousAmount": previousCurrencyBalance.toString()
                            }
                        })
                    }

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
            } else if (trade.type === "sell" && price.greaterThanOrEqualTo(update.price)) {
                const previousAssetBalance = new Decimal(asset?.amount ?? "0")
                const totalAssetBalance = previousAssetBalance.minus(trade.amount)
                
                const previousCurrencyBalance = new Decimal(currency?.amount ?? "0")
                const totalCurrencyBalance = previousCurrencyBalance.plus(totalPrice)
    
                const assetConditionExpression = generateConditionExpression(
                    "#amount",
                    "=",
                    ":previousAmount",
                    previousAssetBalance.isZero() ? undefined : previousAssetBalance.toString()
                )

                const currencyConditionExpression = generateConditionExpression(
                    "#amount",
                    "=",
                    ":previousAmount",
                    previousCurrencyBalance.isZero() ? undefined : previousCurrencyBalance.toString()
                )
    
                if (!totalAssetBalance.isNegative() && !totalCurrencyBalance.isNegative()) {
                    await dynamoDBDocumentClient.update({
                        TableName: "CryptoAssets",
                        Key: {
                            "portfolio": trade.portfolio,
                            "name": currencyName
                        },
                        ConditionExpression: currencyConditionExpression,
                        UpdateExpression: "SET #amount = :totalAmount",
                        ExpressionAttributeNames: {
                            "#amount": "amount"
                        },
                        ExpressionAttributeValues: {
                            ":previousAmount": previousCurrencyBalance.toString(),
                            ":totalAmount": totalCurrencyBalance.toString()
                        }
                    })
    
                    if (totalAssetBalance.isPositive()) {
                        await dynamoDBDocumentClient.update({
                            TableName: "CryptoAssets",
                            Key: {
                                "portfolio": trade.portfolio,
                                "name": assetName
                            },
                            ConditionExpression: assetConditionExpression,
                            UpdateExpression: "SET #amount = :totalAmount",
                            ExpressionAttributeNames: {
                                "#amount": "amount"
                            },
                            ExpressionAttributeValues: {
                                ":previousAmount": previousAssetBalance.toString(),
                                ":totalAmount": totalAssetBalance.toString()
                            }
                        })
                    } else if (totalAssetBalance.isZero()) {
                        await dynamoDBDocumentClient.delete({
                            TableName: "CryptoAssets",
                            Key: {
                                "portfolio": trade.portfolio,
                                "name": assetName
                            },
                            ConditionExpression: assetConditionExpression,
                            ExpressionAttributeNames: {
                                "#amount": "amount"
                            },
                            ExpressionAttributeValues: {
                                ":previousAmount": previousAssetBalance.toString()
                            }
                        })
                    }
    
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
            }
        })
    
    return Promise.all(processedTrades)
}
