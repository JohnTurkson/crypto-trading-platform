import React, {Dispatch, FormEvent, SetStateAction, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {randomInt} from "crypto"

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    icon: {
        minWidth: 50,
        width: 10
    },
})

export interface CoinProps {
    url: string
    name: string
    // price: number
}


export function Coin(props: CoinProps) {
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>

    const [price, setPrice] = useState(0)
    const [dailyPercentChange, setDailyPercentChange] = useState(0)
    const [dailyNetChange, setDailyNetChange] = useState(0)
    const [dailyVolume, setDailyVolume] = useState(0)
    const [dailyLow, setDailyLow] = useState(0)
    const [dailyHigh, setDailyHigh] = useState(0)
    const [dailyOpen, setDailyOpen] = useState(0)
    const [marketCap, setMarketCap] = useState(0)
    const [volatility, setVolatility] = useState(0)
    const [allTimeHigh, setAllTimeHigh] = useState(0)

    // const { row } = props;
    const [open, setOpen] = React.useState(false);

    function update() {
        setPrice(Math.floor(Math.random() * 1000) + 1)
        setDailyPercentChange(Math.floor(Math.random() * 1000) + 1)
        setDailyNetChange(Math.floor(Math.random() * 1000) + 1)

        setDailyLow(Math.floor(Math.random() * 1000) + 1)
        setDailyHigh(Math.floor(Math.random() * 1000) + 1)
        setDailyOpen(Math.floor(Math.random() * 1000) + 1)
        setMarketCap(Math.floor(Math.random() * 1000) + 1)
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <img src = {props.url} className = {classes.icon}></img>
                </TableCell>
                <TableCell align = "right">{props.name}</TableCell>
                <TableCell align = "right">{price}</TableCell>
                <TableCell align = "right">{dailyPercentChange}</TableCell>
                <TableCell align = "right">{dailyNetChange}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Daily Low</TableCell>
                                        <TableCell>Daily High</TableCell>
                                        <TableCell align="right">Daily Open</TableCell>
                                        <TableCell align="right">Market Cap</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{dailyLow}</TableCell>
                                        <TableCell>{dailyHigh}</TableCell>
                                        <TableCell align="right">{dailyOpen}</TableCell>
                                        <TableCell align="right">{marketCap}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button variant="contained" onClick={() => {update()}}>Update</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Coin