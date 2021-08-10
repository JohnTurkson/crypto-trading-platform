import {FormEvent, useEffect, useRef, useState} from "react"
import {
    Button,
    Container,
    makeStyles,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
    createTrade,
    getPortfolioAssets,
    getSupportedAssets,
    getUserPortfolioIds
} from "../requests/PortfolioRequests";
import {useAuth} from "../context/Auth";
import OrdersTable from "../containers/OrdersTable";
import PortfolioSelect from "./PortfolioSelect";

const useStyles = makeStyles(theme => ({
    tabContainer: {
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tradesContainer: {
        marginTop: "100px"
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
    selectContainer: {
        display: "flex",
        flexDirection: "column"
    }
}))

enum TradeCode {
    BUY = 0,
    SELL = 1
}

export function Trade() {
    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(TradeCode.BUY)
    const [portfolios, setPortfolios] = useState([])
    const [selectedPortfolioId, setSelectedPortfolioId] = useState("")
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [quantity, setQuantity] = useState("")
    const [userAssets, setUserAssets] = useState([])
    const [loadingPortfolios, setLoadingPortfolios] = useState<boolean>(true)
    const [selectedPortfolioUSD, setSelectedPortfolioUSD] = useState("")
    const ws = useRef(null)
    
    const [priceData, setPriceData] = useState({})
    
    const {userId} = useAuth()
    useEffect(() => {
        ws.current = new WebSocket("wss://crypto-data-stream.johnturkson.com")
        return () => {
            ws.current.close()
        }
    }, [])
    
    useEffect(() => {
        if (!ws.current) return
        ws.current.onmessage = message => {
            let currData = {...priceData}
            let json = JSON.parse(message.data)
            const assetName = json["asset"].split("-")[0]
            currData[assetName] = json["price"]
            setPriceData(currData)
        }
    }, [priceData])

    useEffect(() => {
        const getPortfoliosAndAssets = async () => {
            const data = await getUserPortfolioIds(userId)
            setPortfolios(data)
            if (data.length > 0) {
                setSelectedPortfolioId(data[0].id)
            }
            setLoadingPortfolios(false)

            if(data.length > 0) {
                if (data[0].id !== "") {
                    const assets = await getPortfolioAssets(data[0].id)
                    console.log(assets)
                    setUserAssets(assets)
                    setSelectedPortfolioUSD(assets.find((asset) => asset.name === "USD").amount)
                }
            }
        }

        getPortfoliosAndAssets()
    }, [])

    const updateCurrencyOptions = async (tab) => {
        setCurrencyOptions(["Loading..."])
        switch (tab) {
            case TradeCode.BUY:
                const supportedAssets = await getSupportedAssets()
                setCurrencyOptions(supportedAssets)
                break
            case TradeCode.SELL:
                if(userAssets !== null) {
                    setCurrencyOptions(userAssets.map(asset => {
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
        if(portfolios.length > 0) {
            const ids = (portfolios).map((portfolio) => portfolio.id)
            const portfolioId = ids.find((id) => selectedPortfolioId === id)
            switch (tab) {
                case TradeCode.BUY:
                    await createTrade(userId,
                        portfolioId,
                        selectedCurrency + "-USD",
                        "buy",
                        quantity,
                        priceData[selectedCurrency].toString())
                    break
                case TradeCode.SELL:
                    await createTrade(userId,
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

    const handleSelectionChange = (event) => {
        const value = event.target.value
        const handleAssets = async (value) => {
            const assets = await getPortfolioAssets(value)
            console.log(assets)
            setUserAssets(assets)
            const usdAsset = assets.find((asset) => asset.name === "USD")
            if(usdAsset !== undefined) {
                setSelectedPortfolioUSD(usdAsset.amount)
            }
            else {
                setSelectedPortfolioUSD("0")
            }
        }
        handleAssets(value)
    }

    const min = 0;
    const max = selectedAsset === null ? 0 : selectedAsset.amount;

    return (
        <>
        <Typography>{(userAssets !== []) ? "Total USD in Portfolio: $" + selectedPortfolioUSD : ""}</Typography>
            <PortfolioSelect portfolios={portfolios} portfolioId={selectedPortfolioId} setPortfolioId={setSelectedPortfolioId} isLoading={loadingPortfolios} onChange={handleSelectionChange}/>
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
                            if (value === null) {
                                setQuantity("")
                            }
                            if (selectedTab === TradeCode.SELL) {
                                const userAsset = (userAssets.find(asset => {
                                    return asset.name === value
                                }))
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
                        inputProps={{min, max}}
                        onChange={(event) => {
                            let value = event.target.value
                            
                            if (selectedTab === TradeCode.SELL) {
                                if (value !== "") {
                                    if (parseInt(value) > max) value = max.toString()
                                    if (parseInt(value) < min) value = min.toString()
                                }
                            }
                            setQuantity(value)
                        }}
                        disabled={!currencyOptions.includes(selectedCurrency)}
                        label="Quantity"/>
                </Container>
                
                <Typography>{
                    (selectedCurrency === null) ? "" :
                        (priceData[selectedCurrency] === undefined) ? "LOADING.." : (selectedCurrency + " Market Price: $" + parseFloat(priceData[selectedCurrency]).toFixed(4) + " USD")
                }</Typography>
                
                <Button
                    className={classes.tradeButton}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        tradeHandler(selectedTab)
                    }}>
                    Trade
                </Button>
            </Container>
            
            <Container className={classes.tradesContainer}>
                <h4>Recent Trades</h4>
            <OrdersTable portfolios={portfolios} selectedPortfolioId={selectedPortfolioId}/>
            </Container>
            </>
    )
}

export default Trade
