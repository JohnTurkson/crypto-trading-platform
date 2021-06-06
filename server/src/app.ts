import express from "express"

const app = express()

const port = 7000
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})
