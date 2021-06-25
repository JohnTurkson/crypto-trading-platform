import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import {Card} from "@material-ui/core"
import Coin from "../components/data/Coin"

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    icon: {
        minWidth: 50,
        width: 10
    },
})


export default function BasicTable() {
    const classes = useStyles()
    const [list, setList] = useState([{
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png",
        name: "Bitcoin",
        price: 30000
    },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png",
            name: "Ethereum",
            price: 3000
        },
        {
            url: "https://static01.nyt.com/images/2021/05/16/fashion/13DOGECOIN-1/13DOGECOIN-1-mediumSquareAt3X.jpg",
            name: "Dogecoin",
            price: 0.50
        }])

    return (

        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Coin</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price (USD$)</TableCell>
                        <TableCell align="right">Daily Change (%)</TableCell>
                        <TableCell align="right">Daily Net Change (USD$)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <Coin name = {row.name} url={row.url}></Coin>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}