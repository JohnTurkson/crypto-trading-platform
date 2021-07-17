import express from "express"
import routesHandler from "./routes/index"

const app = express()
app.use(express.json())

const port = process.env.CRYPTO_TRADING_PLATFORM_PORT

routesHandler(app)

app.listen(port, async () => {
    return console.log(`server is listening on ${port}`)
})
