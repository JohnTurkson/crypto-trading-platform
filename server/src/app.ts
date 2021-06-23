import express from "express"
import initializeDb from "./config/db" 

initializeDb()

const app = express()
app.use(express.json())

const port = 7000
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})
