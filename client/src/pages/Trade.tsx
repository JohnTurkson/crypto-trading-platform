import { useState } from "react"
import { Button, Container, makeStyles, Tab, Tabs, TextField, Toolbar } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

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

export function Trade() {
    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(0)
    const currencies = [
        "BTC",
        "ETH",
        "ADA",
        "DOGE",
    ]

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
                        label="Quantity"/>
                    <Autocomplete
                        className={`${classes.tradeInput} ${classes.selection}`}
                        options={currencies}
                        renderInput={params => (<TextField {...params} label="Currency"/>)}/>
                </Container>

                <Button
                    className={classes.tradeButton}
                    variant="contained"
                    color="primary">
                    Trade
                </Button>
            </Container>
        </>
    )
}
