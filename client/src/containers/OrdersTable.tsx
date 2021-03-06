import { makeStyles } from "@material-ui/core/styles"
import { useEffect, useRef, useState } from "react"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import { listTrades } from "../requests/PortfolioRequests"
import { SubscribeToTradeUpdatesRequest } from "../../../server/src/requests/SubscribeToTradeUpdatesRequest"
import { useAuth } from "../context/Auth"
import { Portfolio } from "../../../server/src/data/Portfolio"
import { Alert } from "@material-ui/lab"
import {Container, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    icon: {
        minWidth: 50,
        width: 10
    }
})

const maxTrades = 10

export default function OrdersTable({portfolios, selectedPortfolioId}: {portfolios: Portfolio[], selectedPortfolioId : string}) {
    const classes = useStyles()

    const ws = useRef(null)
    const {userId} = useAuth()
    const {authToken} = useAuth()
    const [trades, setTrades] = useState([])
    const [loadingTrades, setLoadingTrades] = useState(true)
    
    const updateTrades = async () => {
        if(portfolios.length > 0) {
            const selectedPortfolio = portfolios.find((portfolio) => portfolio.id == selectedPortfolioId)
            if (selectedPortfolio !== undefined) {
                setTrades(await listTrades(userId, selectedPortfolio.id, authToken))
                setLoadingTrades(false)
            }
        }
    }
    
    useEffect(() => {
        ws.current = new WebSocket("wss://crypto-trade-stream.johnturkson.com")
        ws.current.onopen = () => {
            const subscribeToTradeUpdates: SubscribeToTradeUpdatesRequest = {
                authorization: authToken,
                user: userId,
                type: "SubscribeToTradeUpdatesRequest"
            }
            ws.current.send(JSON.stringify(subscribeToTradeUpdates))
        }
        ws.current.onclose = () => {}
        
        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        updateTrades()
    }, [selectedPortfolioId])

    useEffect(() => {
        if (!ws.current) return
        ws.current.onmessage = message => {
            let json = JSON.parse(message.data)
            setTrades(trades.filter((trade) => trade.id !== json.id).concat([json]))
        }
    }, [trades])
            
    return (portfolios.length > 0) ? (loadingTrades) ? <Container>"Loading...."</Container> : ((trades.length === 0) ? <Typography>No Recent Trades</Typography> : (
        <TableContainer component={Paper}>
            <Table aria-label="Trades">
                <TableHead>
                    <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trades.sort((item1, item2) => item2.time - item1.time).slice(0, maxTrades).map((trade) => (
                        <TableRow key={trade.id}>
                            <TableCell component="th" scope="row">
                                {trade.ticker}
                            </TableCell>
                            <TableCell align="right">{trade.type[0].toUpperCase() + trade.type.slice(1)}</TableCell>
                            <TableCell align="right">{trade.amount}</TableCell>
                            <TableCell
                                align="right">{"$" + (parseFloat(trade.amount) * parseFloat(trade.price)).toFixed(2) + " USD"}</TableCell>
                            <TableCell align="right">{"" + new Date(trade.time).toLocaleString()}</TableCell>
                            <TableCell align="right">{trade.status[0].toUpperCase() + trade.status.slice(1)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )) : (<Alert severity="error">Select or Create a Portfolio to View Recent Trades</Alert>)
}
