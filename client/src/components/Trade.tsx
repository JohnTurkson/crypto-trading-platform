import {FormEvent, useEffect, useState} from "react"
import {Button, Container, makeStyles, Tab, Tabs, TextField, Toolbar, Typography} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
    createTrade,
    getPortfolioAssets,
    getSupportedAssets,
    getUserPortfolioIds
} from "../requests/PortfolioRequests";
import {useAuth} from "../context/Auth";

const useStyles = makeStyles(theme => ({
    tabContainer: {
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    selection: {
        minWidth: "200px",
    },
    tradeContainer: {
        margin: "16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    tradeInput: {
        margin: "8px",
    },
    tradeButton: {
        margin: "16px",
    },
}))

enum TradeCode {
    BUY = 0,
    SELL = 1
}

const connection = new WebSocket("wss://crypto-data-stream.johnturkson.com")

export function Trade() {
    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(TradeCode.BUY)
    const [selectedPortfolio, setSelectedPortfolio] = useState(0)
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState("")
    const [quantity, setQuantity] = useState("")

    const [priceData, setPriceData] = useState(new Map<string, number>())

    const userId = "1"
    const updateCurrencyOptions = async (tab) => {
        setCurrencyOptions(["Loading..."])
        switch (tab) {
            case TradeCode.BUY:
                const supportedAssets = await getSupportedAssets()
                setCurrencyOptions(supportedAssets)
                break
            case TradeCode.SELL:
                const ids = (await getUserPortfolioIds(userId)).map((portfolio) => portfolio.id)
                let userAssets = []
                if(ids.length !== 0) {
                    userAssets = await getPortfolioAssets(ids[selectedPortfolio])
                }
                setCurrencyOptions(userAssets.map(asset => {
                    return asset.name
                }))
                break
            default:
                break
        }
    }

    const tradeHandler = async(tab) => {
        const portfolios = (await getUserPortfolioIds(userId))

        if(portfolios.length !== 0) {
            console.log(portfolios.portfolios[0])
            const portfolioId = ""
            switch (tab) {
                case TradeCode.BUY:
                    const buyTrade = await createTrade(userId,
                        portfolioId,
                        selectedCurrency + "-USD",
                        "buy",
                        quantity,
                        priceData.get(selectedCurrency).toString())
                    break
                case TradeCode.SELL:
                    const sellTrade = await createTrade(userId,
                        portfolioId,
                        selectedCurrency + "-USD",
                        "sell",
                        quantity,
                        priceData.get(selectedCurrency).toString())
                    break
                default:
                    break
            }
        }
    }

    useEffect(() => {
        connection.onmessage = message => {
            let currData = priceData
            let json = JSON.parse(message.data)

            const assetName = json["asset"].split("-")[0]
            currData.set(assetName, json["price"])
            setPriceData(currData)
        }
    })

    useEffect(() => {
        updateCurrencyOptions(selectedTab)
    }, [])

    return (
        <>
            <Container className={classes.tabContainer}>
                <Toolbar>
                    <Tabs value={selectedTab}
                          onChange={(event, index) => {
                              setSelectedTab(index)
                              updateCurrencyOptions(index)
                          }}
                          textColor="primary"
                          indicatorColor="primary">
                        <Tab label="Buy">
                        </Tab>
                        <Tab label="Sell">
                        </Tab>
                    </Tabs>
                </Toolbar>

                <Container className={classes.tradeContainer}>
                    <TextField
                        className={classes.tradeInput}
                        variant="outlined"
                        onChange={(event) => setQuantity(event.target.value)}
                        label="Quantity"/>
                    <Autocomplete
                        className={`${classes.tradeInput} ${classes.selection}`}
                        options={currencyOptions}
                        onChange={(event, value) => {
                            setSelectedCurrency(value)
                        }}
                        renderInput={params => (<TextField {...params} label="Currency"/>)}/>
                </Container>

                <Typography variant={"h4"}>{
                    (selectedCurrency !== "") ? selectedCurrency + " Market Price: $" + (parseInt(quantity) * priceData.get(selectedCurrency)) + " USD" : ""
                }</Typography>

                <Button
                    className={classes.tradeButton}
                    variant="contained"
                    color="primary"
                    onClick={() => { tradeHandler(selectedTab) }}>
                    Trade
                </Button>
            </Container>


        </>

    )

}

export default Trade;
