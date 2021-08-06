import WebSocket from "ws"
import { PublishCommand } from "@aws-sdk/client-sns"
import { PriceData } from "./data/PriceData"
import { snsClient } from "./resources/Clients"
import axios from "axios"

const connection = new WebSocket("wss://ws-feed.pro.coinbase.com")
const updateInterval = 1000
const lastUpdateTimes = new Map()

connection.on("open", async () => {
    const supportedCurrencyPairs = await getSupportedCurrencyPairs()
    const time = Math.floor(Date.now() / updateInterval)
    supportedCurrencyPairs.forEach(pair => lastUpdateTimes.set(pair, time))
    const message = {"type": "subscribe", "channels": [{"name": "ticker", "product_ids": supportedCurrencyPairs}]}
    connection.send(JSON.stringify(message))
})

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
            if (update.time > lastUpdateTimes.get(update.asset)) {
                snsClient.send(new PublishCommand({
                    TopicArn: process.env.DATA_STREAM_TOPIC!,
                    Message: JSON.stringify(update)
                }))
                console.log(update)
            }
            lastUpdateTimes.set(update.asset, update.time)
        })
})

async function getSupportedCurrencyPairs(): Promise<string[]> {
    const supportedAssets: string[] = await axios.get("https://crypto.johnturkson.com/GetSupportedAssets").then(response => response.data)
    const supportedCurrencies: string[] = await axios.get("https://crypto.johnturkson.com/GetSupportedCurrencies").then(response => response.data)
    return supportedAssets.flatMap(asset => supportedCurrencies.map(currency => `${asset}-${currency}`))
}
