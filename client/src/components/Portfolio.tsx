import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import {useEffect, useState} from "react";
import {randomInt} from "crypto";

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
function calculatePortfolioValue(cryptos: any[]): number {

    let value = 0
    cryptos.forEach(crypto => {
        value += crypto.price
    })

    return value
}

const Portfolio = (props: any) => {

    const classes = useStyles()
    const [valueChange, setValueChange] = useState(0)
    const [changeColor, setChangeColor] = useState("")
    const [changeSign, setChangeSign] = useState("")
    const [percentChangeSign, setPercentChangeSign] = useState("")

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
    })

    return (
        <Box display="flex" flexDirection="column" component={"div"}>
            <Typography variant="h6">
                {"Current Balance"}
            </Typography>

            <Box display="flex" flexDirection="row" component={"div"}>
                <Typography component="h1" variant="h4">
                    {"$" + numberWithCommas(calculatePortfolioValue(props.data).toFixed(2))}
                </Typography>

                <Button variant="contained" className={classes.changeComponent} style={{backgroundColor: changeColor}}>
                    {(valueChange / calculatePortfolioValue(props.data) * 100).toFixed(2) + "%" + " " + percentChangeSign}
                </Button>
            </Box>
            <Typography variant="h6" style={{color: changeColor}}>
                {changeSign + "$" + Math.abs(valueChange).toFixed(2)}
            </Typography>
            <Button variant="contained" onClick={() => setValueChange(5000 + Math.random() * (-10000))}>Refresh</Button>
        </Box>
        // TODO: Display list of cryptos recieved (user's portfolio of cryptos)
    )
}

export default Portfolio
