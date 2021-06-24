import fs from "fs"
import express from "express"

export default (app: express.Application) => {
    fs.readdirSync(__dirname).forEach(async (file) => {
        let name = file.substr(0, file.indexOf('.'))
        if (name == "index") return
        const { default: routes } = await import(`./${name}`)
        routes(app)
    });
}