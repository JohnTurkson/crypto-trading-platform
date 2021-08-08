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
        "CreatePortfolio": "./CreatePortfolio.js",
        "ListPortfolioAssets": "./ListPortfolioAssets.js",
        "DepositAsset": "./DepositAsset.js",
        "WithdrawAsset": "./WithdrawAsset.js",
        "CreateTrade": "./CreateTrade.js",
        "CancelTrade": "./CancelTrade.js",
        "ListTrades": "./ListTrades.js",
        "ProcessOpenTrades": "./ProcessOpenTrades.js"
    },
    mode: "development",
    target: "node",
    devtool: false,
    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, "build", "webpack"),
        filename: "[name].js"
    }
}
