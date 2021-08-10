import {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Box from "@material-ui/core/Box"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import {Link} from "react-router-dom"

const useStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    row: {
        display: "inline-block"
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
    json: JSON
    url: string
    name: string
    price: number
    amountOwned: number
    portfolio: boolean

}

export function Coin(props: CoinProps) {
    const classes = useStyles()
    const [price, setPrice] = useState(0)
    const [dailyPercentChange, setDailyPercentChange] = useState(0)
    const [dailyNetChange, setDailyNetChange] = useState(0)
    const [dailyVolume, setDailyVolume] = useState(0)
    const [dailyLow, setDailyLow] = useState(0)
    const [dailyHigh, setDailyHigh] = useState(0)
    const [dailyOpen, setDailyOpen] = useState(0)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log(props.price)
        //setPrice(props.price)
        let json = props.json
        if (json == undefined) return
        setPrice(json["price"])
        setDailyOpen(json["open"])
        setDailyPercentChange(Math.round(((price - dailyOpen) / dailyOpen * 100) * 100) / 100)
        setDailyNetChange(Math.round((price - dailyOpen) * 100) / 100)
        setDailyLow(json["low"])
        setDailyHigh(json["high"])
        setDailyVolume(Math.round(json["volume"] * 100) / 100)
    })

    const newTo = {
        pathname: "/coin/" + props.name,
        state: {url: props.url, name: props.name}
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Link to={newTo}>
                        <img src={props.url} className={classes.icon}></img>
                    </Link>
                </TableCell>
                <TableCell align="right">{props.name}</TableCell>

                {props.portfolio ? <>
                    <TableCell align="right">{props.amountOwned}</TableCell>
                    <TableCell align="right">{props.amountOwned * price}</TableCell>
                </> : <></>}

                <TableCell align="right">{price}</TableCell>
                <TableCell align="right">{dailyPercentChange}</TableCell>
                <TableCell align="right">{dailyNetChange}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Daily Low</TableCell>
                                        <TableCell>Daily High</TableCell>
                                        <TableCell align="right">Daily Open</TableCell>
                                        <TableCell align="right">Daily Volume</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{dailyLow}</TableCell>
                                        <TableCell>{dailyHigh}</TableCell>
                                        <TableCell align="right">{dailyOpen}</TableCell>
                                        <TableCell align="right">{dailyVolume}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>

    )
}

export default Coin
