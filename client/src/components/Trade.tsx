import { useEffect, useRef, useState } from "react"
import { Button, Container, makeStyles, Tab, Tabs, TextField, Toolbar, Typography } from "@material-ui/core"
import { Alert, Autocomplete, Color } from "@material-ui/lab"
import { createTrade, getPortfolioAssets, getSupportedAssets, getUserPortfolioIds } from "../requests/PortfolioRequests"
import { useAuth } from "../context/Auth"
import OrdersTable from "../containers/OrdersTable"
import PortfolioSelect from "./PortfolioSelect"
import { Link } from "react-router-dom"
import { Asset } from "../../../server/src/data/Asset"

const useStyles = makeStyles(theme => ({
    banner: {
        marginBottom: "16px",
    },
    tabContainer: {
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tradesContainer: {
        marginTop: "100px",
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
    },
    parentContainer: {
        width: "70%"
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
    const [price, setPrice] = useState("")
    const [userAssets, setUserAssets] = useState([] as Asset[])
    const [loadingPortfolios, setLoadingPortfolios] = useState<boolean>(true)
    const [showBanner, setShowBanner] = useState(false)
    const [banner, setBanner] = useState("")
    const [bannerType, setBannerType] = useState("")
    
    const ws = useRef(null)
    
    const [priceData, setPriceData] = useState({})
    
    const {userId} = useAuth()
    const {authToken} = useAuth()
    
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
            
            if (data.length > 0) {
                if (data[0].id !== "") {
                    const assets = await getPortfolioAssets(data[0].id)
                    setUserAssets(assets)
                }
            }
        }
        
        getPortfoliosAndAssets()
    }, [])
    
    const updateCurrencyOptions = async (tab) => {
        setCurrencyOptions(["Loading..."])
        if (tab === TradeCode.BUY) {
            const supportedAssets = await getSupportedAssets()
            setCurrencyOptions(supportedAssets)
        } else if (tab === TradeCode.SELL) {
            const assets = await getPortfolioAssets(selectedPortfolioId)
            if (assets !== null) {
                const supportedAssets = await getSupportedAssets()
                const currencyOptions = assets.map(asset => asset.name).filter(assetName => supportedAssets.includes(assetName))
                setCurrencyOptions(currencyOptions)
            }
        }
    }
    
    useEffect(() => {
        updateCurrencyOptions(selectedTab)
    }, [selectedPortfolioId])
    
    const tradeHandler = async (tab) => {
        if (portfolios.length > 0) {
            const ids = (portfolios).map((portfolio) => portfolio.id)
            const portfolioId = ids.find((id) => selectedPortfolioId === id)
            
            if (quantity === "0") {
                setShowBanner(true)
                setBannerType("error")
                setBanner("Invalid Quantity")
                return
            }
            
            if (price === "0") {
                setShowBanner(true)
                setBannerType("error")
                setBanner("Invalid Price")
                return
            }
            
            const trade = await createTrade(
                userId,
                authToken,
                portfolioId,
                selectedCurrency + "-USD",
                tab === TradeCode.BUY ? "buy" : "sell",
                quantity,
                price
            )
            
            setShowBanner(true)
            setBannerType(trade.success ? "success" : "error")
            setBanner(trade.success ? "Trade Created" : (trade?.error ?? "Something went wrong"))
        }
    }
    
    const handleSelectionChange = (event) => {
        const value = event.target.value
        const handleAssets = async (value) => {
            const assets = await getPortfolioAssets(value)
            setUserAssets(assets)
        }
        handleAssets(value)
    }
    
    const min = 0
    const max = selectedAsset === null ? 0 : selectedAsset.amount
    
    return (
        <div className={classes.parentContainer}>
            <Container className={classes.banner}>
                {showBanner ? <Alert severity={bannerType as Color}>{banner}</Alert> : ""}
            </Container>
            <PortfolioSelect portfolios={portfolios} portfolioId={selectedPortfolioId}
                             setPortfolioId={setSelectedPortfolioId} isLoading={loadingPortfolios}
                             onChange={handleSelectionChange}/>
            {portfolios.length === 0 ? (<Button component={Link} to="/overview" variant="contained" color="primary">
                Create Portfolio
            </Button>) : ""}
            <Container className={classes.tabContainer}>
                <Toolbar>
                    <Tabs value={selectedTab}
                          onChange={(event, index) => {
                              setSelectedTab(index)
                              updateCurrencyOptions(index)
                              setSelectedCurrency(null)
                              setQuantity("")
                              setPrice("")
                              setShowBanner(false)
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
                            setShowBanner(false)
                            if (value === null) {
                                setQuantity("")
                            }
                            if (selectedTab === TradeCode.SELL) {
                                const userAsset = (userAssets.find(asset => asset.name === value))
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
                            setShowBanner(false)
                            
                            let value = event.target.value
                            if (isNaN(+value)) {
                                setQuantity(quantity)
                                return
                            }
                            if (selectedTab === TradeCode.SELL) {
                                if (value !== "") {
                                    if (parseFloat(value) > max) {
                                        setShowBanner(true)
                                        setBannerType("warning")
                                        setBanner("This trade may not fulfill due to insufficient balance.")
                                    } else if (parseFloat(value) < min) {
                                        value = min.toString()
                                    }
                                }
                            } else if (selectedTab === TradeCode.BUY) {
                                setShowBanner(false)
                                if (parseFloat(value) === 0) {
                                    value = ""
                                }
                            }
                            setQuantity(value)
                        }}
                        disabled={!currencyOptions.includes(selectedCurrency)}
                        label="Quantity"/>
                    <TextField
                        className={classes.tradeInput}
                        variant="outlined"
                        value={price}
                        onChange={event => {
                            setShowBanner(false)
                            let value = event.target.value
                            if (value === "") {
                                value = ""
                            } else if (isNaN(+value)) {
                                value = price
                            } else if (parseFloat(value) < 0) {
                                value = price
                            }
                            
                            const currency = userAssets.filter(asset => asset.name === "USD")[0]?.amount
                            
                            if (currency !== undefined && selectedTab === TradeCode.BUY) {
                                if (parseFloat(quantity) * parseFloat(value) > parseFloat(currency)) {
                                    setShowBanner(true)
                                    setBannerType("warning")
                                    setBanner("This trade may not fulfill due to insufficient balance.")
                                }
                            }
                            
                            if (selectedTab === TradeCode.SELL) {
                                if (parseFloat(quantity) > parseFloat(selectedAsset.amount)) {
                                    setShowBanner(true)
                                    setBannerType("warning")
                                    setBanner("This trade may not fulfill due to insufficient balance.")
                                }
                            }
                            
                            setPrice(value)
                        }}
                        disabled={quantity === "" || quantity === "0"}
                        label="Price"/>
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
        </div>
    )
}

export default Trade
