import Navbar from "./Navbar"
import styled from "styled-components"
import { ReactNode } from "react"
import {Button, Container, makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    container: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column"
    },
    pricesContainer: {
       display: "flex",
       flexDirection: "row"
    },
    changeComponent: {
        background: "#00FF00",
        color: "white",
        fontWeight: "bold",
        marginLeft: theme.spacing(20)
    },
    changeValueComponent: {
        color: "#00FF00"
    }
}))

function numberWithCommas(valueStr: string) {
    return valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculatePortfolioValue(cryptos: any[]): number {

    let value = 0
    cryptos.forEach(crypto => {
        value += crypto.price
    })

    return value
}

const Portfolio = (props: any) => {

    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant="h6">
                {"Current Balance"}
            </Typography>

            <div className={classes.pricesContainer}>
                <Typography component="h1" variant="h4">
                    {"$" + numberWithCommas(calculatePortfolioValue(props.data).toFixed(2))}
                </Typography>

                <Button variant="contained" className={classes.changeComponent}>
                    {"24.7%"}
                </Button>
            </div>
            <Typography variant="h6" className={classes.changeValueComponent}>
                {"$182.23"}
            </Typography>
        </div>
        // TODO: Display list of cryptos recieved (user's portfolio of cryptos)
    )
}

export default Portfolio