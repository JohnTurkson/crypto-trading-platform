import express from "express"
import routesHandler from "./routes/index"
import CreatePortfolioHandler from "./handlers/CreatePortfolioHandler"
import DefaultDatabaseProxy from "./database/DefaultDatabaseClient"
import GetPortfolioHandler from "./handlers/GetPortfolioHandler"

const app = express()
app.use(express.json())

const port = process.env.CRYPTO_TRADING_PLATFORM_PORT!

const database = new DefaultDatabaseProxy()
routesHandler(app)

app.get("/", async (request, response) => {
    console.log(request)
    response.send("Hello World").end()
})

app.post("/CreatePortfolio", async (request, response) => {
    const handler = new CreatePortfolioHandler(database)
    handler.handleRequest(request.body)
        .then(createPortfolioResponse => response.status(200).json(createPortfolioResponse))
        .catch(errorResponse => response.status(400).json(errorResponse))
})

app.get("/ListPortfolios", async (request, response) => {
    const handler = new GetPortfolioHandler(database)
    handler.handleRequest(request.body)
        .then(createPortfolioResponse => response.status(200).json(createPortfolioResponse))
        .catch(errorResponse => response.status(400).json(errorResponse))
})

app.listen(port, async () => {
    return console.log(`server is listening on ${port}`)
})
