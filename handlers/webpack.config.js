const path = require("path")
module.exports = {
    context: path.join(__dirname, "src", "functions"),
    entry: {
        "AddConnection": "./AddConnection.js",
        "RemoveConnection" : "./RemoveConnection.js",
        "BroadcastUpdate": "./BroadcastUpdate.js",
        "SaveUpdate": "./SaveUpdate.js",
        "GetSupportedAssets": "./GetSupportedAssets.js",
        "GetSupportedCurrencies": "./GetSupportedCurrencies.js",
        "ListPortfolios": "./ListPortfolios.js",
        "CreatePortfolio": "./CreatePortfolio.js"
    },
    mode: "production",
    target: "node",
    devtool: false,
    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, "build", "webpack"),
        filename: "[name].js"
    }
}
