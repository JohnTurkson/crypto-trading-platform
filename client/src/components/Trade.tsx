import {useEffect, useState} from "react"
import { Button, Container, makeStyles, Tab, Tabs, TextField, Toolbar } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {purchaseAssetRequest} from "../requests/PortfolioRequests";
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
function onTrade(tradeCode : number, selectedCurrency: string, quantity: string) {
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (selectedCurrency === "BTC") {
            connection.onmessage = message => {
                let json = JSON.parse(message.data)
                setPrice(parseFloat(json["price"]))
            }
        }
    })

    switch(tradeCode) {
        case TradeCode.BUY:
            purchaseAssetRequest(localStorage.getItem("userId"), selectedCurrency, quantity, price.toString())
            break;
        case TradeCode.SELL:

            break;
        default:
            break;
    }
}

export function Trade() {
    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(0)
    const currencies = [
        "BTC",
    ]
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
    const [quantity, setQuantity] = useState("")

    return (
        <>
            <Container className={classes.tabContainer}>
                <Toolbar>
                    <Tabs value={selectedTab}
                          onChange={(event, index) => setSelectedTab(index)}
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
                        options={currencies}
                        onChange={(event, value) => setSelectedCurrency(value)}
                        renderInput={params => (<TextField {...params} label="Currency"/>)}/>
                </Container>

                <Button
                    className={classes.tradeButton}
                    variant="contained"
                    color="primary"
                    onClick={() => onTrade(selectedTab, selectedCurrency, quantity)}>
                    Trade
                </Button>
            </Container>

        </>

    )

}

export default Trade;
