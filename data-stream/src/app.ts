import WebSocket from "ws"

const connection = new WebSocket("wss://ws-feed.pro.coinbase.com")

connection.on("open", () => {
    const message = {"type": "subscribe", "channels": [{"name": "ticker", "product_ids": ["BTC-USD"]}]}
    connection.send(JSON.stringify(message))
})

connection.on("message", data => {
    [data]
        .filter(d => typeof d === "string")
        .map(d => d as string)
        .map(d => JSON.parse(d))
        .filter(d => d.type === "ticker")
        .map(d => ({
            source: "Coinbase",
            currency: d.product_id,
            price: d.price,
            time: Date.now()
        }))
        // put into database
        // broadcast to SNS
        .forEach(e => console.log(e))
})

interface PriceData {
    source: string,
    currency: string,
    price: string,
    time: number,
}
