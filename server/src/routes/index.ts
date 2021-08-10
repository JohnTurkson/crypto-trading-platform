import fs from "fs"
import express from "express"

// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
export default (app: express.Application) => {
    fs.readdirSync(__dirname).forEach(async (file) => {
        const name = file.substr(0, file.indexOf("."))
        if (name == "index") return
        const {default: routes} = await import(`./${name}`)
        routes(app)
    })
}
