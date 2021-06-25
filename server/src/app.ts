import express from "express"
import initializeDb from "./config/DatabaseConfig"
import routesHandler from "./routes/index"

initializeDb().then(() => console.log("Established connection with mongoDB"))

const app: express.Application = express()
app.use(express.json())

const port = 7000

routesHandler(app)

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})
