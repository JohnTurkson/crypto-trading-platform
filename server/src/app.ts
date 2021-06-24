import express from "express"
import initializeDb from "./config/db"
import routesHandler from "./routes/index"

initializeDb()

const app: express.Application = express()
app.use(express.json())

const port = 7000

app.get("/", (req, res) => {
    res.send("Hello World")
})

routesHandler(app)

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})
