import {Box, Button, makeStyles, setRef, Typography} from "@material-ui/core"
import React, {useEffect, useState} from "react";
import {randomInt} from "crypto";
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Coin from "./data/Coin"
import {AssetData, getPortfolioRequest} from "../requests/PortfolioRequests";

const useStyles = makeStyles(theme => ({
    container: {
        flexDirection: "row"
    },
    changeComponent: {
        color: "white",
        fontWeight: "bold",
        marginLeft: theme.spacing(10)
    }
}))

// TODO: swap this out later on
function numberWithCommas(valueStr: string) {
    return valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// TODO: change any type
function calculatePortfolioValue(cryptos: AssetData[]): number {

    let value = 0
    cryptos.forEach(crypto => {
        value += parseInt(crypto.amountOwned) * parseInt(crypto.price)
    })

    return value
}

const Portfolio = (props: any) => {

    const classes = useStyles()
    const [valueChange, setValueChange] = useState(0)
    const [changeColor, setChangeColor] = useState("")
    const [changeSign, setChangeSign] = useState("")
    const [percentChangeSign, setPercentChangeSign] = useState("")
    const [cryptos, setCryptos] = useState(props.data)
    const [refresh, setRefresh] = useState(0)

    async function fetchData() {
        const response = await getPortfolioRequest(localStorage.getItem("userId"))
        setCryptos(response.assets)
    }

    useEffect(() => {

        // Change button color
        if(valueChange >= 0) {
            setChangeColor("#0FFF00")
            setChangeSign("+")
            setPercentChangeSign("↑")
        }
        else {
            setChangeColor("red")
            setChangeSign("-")
            setPercentChangeSign("↓")
        }

        if(refresh === 1) {
            fetchData()
            setRefresh(0)
        }
    })

    return (
        <div>
        <Box display="flex" flexDirection="column" component={"div"}>
            <Typography variant="h6">
                {"Current Balance"}
            </Typography>

            <Box display="flex" flexDirection="row" component={"div"}>
                <Typography component="h1" variant="h4">
                    {"$" + numberWithCommas(calculatePortfolioValue(props.data).toFixed(2))}
                </Typography>

                <Button variant="contained" className={classes.changeComponent} style={{backgroundColor: changeColor}}>
                    {(valueChange / calculatePortfolioValue(cryptos) * 100).toFixed(2) + "%" + " " + percentChangeSign}
                </Button>
            </Box>
            <Typography variant="h6" style={{color: changeColor}}>
                {changeSign + "$" + Math.abs(valueChange).toFixed(2)}
            </Typography>
            <Button variant="contained" onClick={() => {
                setValueChange(5000 + Math.random() * (-10000))
                setRefresh(1)
            }}>Refresh</Button>
        </Box>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Coin</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Amount Owned</TableCell>
                            <TableCell align="right">Total Value Owned</TableCell>
                            <TableCell align="right">Price (USD$)</TableCell>
                            <TableCell align="right">Daily Change (%)</TableCell>
                            <TableCell align="right">Daily Net Change (USD$)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row : AssetData) => (
                            <Coin name = {row.coinName} url={""} price={parseInt(row.price)} amountOwned={parseInt(row.amountOwned)} portfolio ={true}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Portfolio
