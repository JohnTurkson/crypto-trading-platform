import { useEffect, useRef, useState } from "react"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import { getUserPortfolioIds, listTrades } from "../requests/PortfolioRequests"
import { SubscribeToTradeUpdatesRequest } from "../../../server/src/requests/SubscribeToTradeUpdatesRequest"
import { useAuth } from "../context/Auth"

const maxTrades = 10

export default function OrdersTable() {
    const ws = useRef(null)
    const {userId} = useAuth()
    const [trades, setTrades] = useState([])
    
    const updateTrades = async () => {
        const ids = (await getUserPortfolioIds(userId)).map((portfolio) => portfolio.id)
        if (ids.length > 0) {
            setTrades(trades.concat(await listTrades(ids[0])))
        }
    }
    
    useEffect(() => {
        updateTrades()
        ws.current = new WebSocket("wss://crypto-trade-stream.johnturkson.com")
        ws.current.onopen = () => {
            console.log("ws opened")
            
            const subscribeToTradeUpdates: SubscribeToTradeUpdatesRequest = {
                authorization: "",
                user: userId,
                type: "SubscribeToTradeUpdatesRequest"
            }
            ws.current.send(JSON.stringify(subscribeToTradeUpdates))
        }
        ws.current.onclose = () => console.log("ws closed")
        
        return () => {
            ws.current.close()
        }
    }, [])
    
    useEffect(() => {
        if (!ws.current) return
        ws.current.onmessage = message => {
            let json = JSON.parse(message.data)
            setTrades(trades.filter((trade) => trade.id !== json.id).concat([json]))
        }
    }, [trades])
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Trades">
                <TableHead>
                    <TableRow>
                        <TableCell>Coin</TableCell>
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
    )
}
