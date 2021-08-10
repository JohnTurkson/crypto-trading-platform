import {FormEvent, useEffect, useRef, useState} from "react"
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

export function Trade() {
    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(TradeCode.BUY)
    const [selectedPortfolio, setSelectedPortfolio] = useState(0)
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [quantity, setQuantity] = useState("")
    const [userAssets, setUserAssets] = useState(null)

    const ws = useRef(null)

    const [priceData, setPriceData] = useState({})

    const userId = "1"
    useEffect(() => {
        // Open web socket connection
        ws.current = new WebSocket("wss://crypto-data-stream.johnturkson.com")
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = message => {
            let currData = {...priceData}
            let json = JSON.parse(message.data)

            const assetName = json["asset"].split("-")[0]
            currData[assetName] = json["price"]
            setPriceData(currData)
        }
    }, [priceData])

    const updateCurrencyOptions = async (tab) => {
        setCurrencyOptions(["Loading..."])
        switch (tab) {
            case TradeCode.BUY:
                const supportedAssets = await getSupportedAssets()
                setCurrencyOptions(supportedAssets)
                break
            case TradeCode.SELL:
                const ids = (await getUserPortfolioIds(userId)).map((portfolio) => portfolio.id)
                let assets = null
                if(ids.length !== 0) {
                    assets = await getPortfolioAssets(ids[selectedPortfolio])
                    setUserAssets(assets)
                }
                if(assets !== null) {
                    setCurrencyOptions(assets.map(asset => {
                        return asset.name
                    }).filter(assetName => {
                        return assetName !== "USD"
                    }))
                }
                break
            default:
                break
        }
    }

    const tradeHandler = async(tab) => {
        const portfolios = (await getUserPortfolioIds(userId))
        if(portfolios.length !== 0) {
            const portfolioId = portfolios[selectedPortfolio].id
            switch (tab) {
                case TradeCode.BUY:
                    const buyTrade = await createTrade(userId,
                        portfolioId,
                        selectedCurrency + "-USD",
                        "buy",
                        quantity,
                        priceData[selectedCurrency].toString())
                    break
                case TradeCode.SELL:
                    const sellTrade = await createTrade(userId,
                        portfolioId,
                        selectedCurrency + "-USD",
                        "sell",
                        quantity,
                        priceData[selectedCurrency].toString())
                    break
                default:
                    break
            }
        }
    }

    useEffect(() => {
        updateCurrencyOptions(selectedTab)
    }, [])

    const min = 0;
    const max = selectedAsset === null ? 0 : selectedAsset.amount;

    return (
        <>
            <Container className={classes.tabContainer}>
                <Toolbar>
                    <Tabs value={selectedTab}
                          onChange={(event, index) => {
                              setSelectedTab(index)
                              updateCurrencyOptions(index)
                              setQuantity("")
                              setSelectedCurrency(null)
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
                    <Autocomplete
                        value={selectedCurrency}
                        className={`${classes.tradeInput} ${classes.selection}`}
                        options={currencyOptions}
                        onChange={(event, value) => {
                            if(value === null) {
                                setQuantity("")
                            }
                            if(selectedTab === TradeCode.SELL) {
                                const userAsset = (userAssets.find(asset => { return asset.name === value }))
                                setQuantity(userAsset.amount)
                                setSelectedAsset(userAsset)
                            }
                            setSelectedCurrency(value)
                        }}
                        renderInput={params => (<TextField {...params} label="Currency"/>)}/>
                    <TextField
                        className={classes.tradeInput}
                        variant="outlined"
                        value={quantity}
                        inputProps= {{min, max}}
                        onChange={(event) => {
                            let value = event.target.value;
                            if(value !== "") {
                                if (parseInt(value) > max) value = max.toString();
                                if (parseInt(value) < min) value = min.toString();
                            }
                            setQuantity(value)
                        }}
                        disabled={!currencyOptions.includes(selectedCurrency)}
                        label="Quantity"/>
                </Container>

                <h4>{
                    (selectedCurrency === null) ? "" :
                        (priceData[selectedCurrency] === undefined) ? "LOADING.." : (selectedCurrency + " Market Price: $" + priceData[selectedCurrency] + " USD")
                }</h4>

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
