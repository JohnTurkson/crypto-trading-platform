import { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Coin from "../components/data/Coin"

const useStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    icon: {
        minWidth: 50,
        width: 10
    },
})

const connection = new WebSocket("wss://crypto-data-stream.johnturkson.com")

export default function BasicTable() {
    let bitcoinURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png"
    let ethereumURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png"
    let dogeCoinURL = "https://static01.nyt.com/images/2021/05/16/fashion/13DOGECOIN-1/13DOGECOIN-1-mediumSquareAt3X.jpg"
    
    const [bitcoinJSON, setBitcoinJSON] = useState({})
    const [ethereumJSON, setEthereumJSON] = useState({})
    const [dogeCoinJSON, setDogeCoinJSON] = useState({})
    
    useEffect(() => {
        connection.onmessage = message => {
            let json = JSON.parse(message.data)
            console.log(json)
            if (json["asset"] == "BTC-USD") {
                setBitcoinJSON(json)
            } else if (json["asset"] == "ETH-USD") {
                setEthereumJSON(json)
            } else if (json["asset"] == "DOGE-USD") {
                setDogeCoinJSON(json)
            }
        }
    })
    
    return (
        
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Coin</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price (USD$)</TableCell>
                        <TableCell align="right">Daily Change (%)</TableCell>
                        <TableCell align="right">Daily Net Change (USD$)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Coin json={bitcoinJSON}
                          name={"Bitcoin"}
                          url={bitcoinURL}
                          price={0}
                          amountOwned={0}
                          portfolio={false}/>
                    <Coin json={ethereumJSON}
                          name={"Ethereum"}
                          url={ethereumURL}
                          price={0}
                          amountOwned={0}
                          portfolio={false}/>
                    <Coin json={dogeCoinJSON}
                          name={"Dogecoin"}
                          url={dogeCoinURL}
                          price={0}
                          amountOwned={0}
                          portfolio={false}/>
                </TableBody>
            </Table>
        </TableContainer>
    
    )
}
