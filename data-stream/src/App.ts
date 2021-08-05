import WebSocket from "ws"
import { PublishCommand } from "@aws-sdk/client-sns"
import { PriceData } from "./data/PriceData"
import { snsClient } from "./resources/Clients"

const connection = new WebSocket("wss://ws-feed.pro.coinbase.com")

connection.on("open", () => {
    const message = {"type": "subscribe", "channels": [{"name": "ticker", "product_ids": ["BTC-USD"]}]}
    connection.send(JSON.stringify(message))
})

const updateInterval = 1000
let lastUpdateTime = Math.floor(Date.now() / updateInterval)

connection.on("message", data => {
    [data]
        .filter(update => typeof update === "string")
        .map(update => update as string)
        .map(update => JSON.parse(update))
        .filter(update => update.type === "ticker")
        .map(update => ({
            source: "Coinbase",
            asset: update.product_id,
            price: update.price,
            open: update.open_24h,
            high: update.high_24h,
            low: update.low_24h,
            volume: update.volume_24h,
            time: Math.floor(Date.now() / updateInterval)
        }))
        .forEach((update: PriceData) => {
            if (update.time > lastUpdateTime) {
                snsClient.send(new PublishCommand({
                    TopicArn: process.env.DATA_STREAM_TOPIC!,
                    Message: JSON.stringify(update)
                }))
                console.log(update)
            }
            lastUpdateTime = update.time
        })
})
