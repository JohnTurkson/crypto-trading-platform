import Navbar from "./Navbar"
import styled from "styled-components"
import { ReactNode } from "react"
import {Box, Button, Container, createMuiTheme, makeStyles, Typography} from "@material-ui/core"
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    container: {
        flexDirection: "row"
    },
    changeComponent: {
        background: "#00FF00",
        color: "white",
        fontWeight: "bold",
        marginLeft: theme.spacing(10)
    },
    changeValueComponent: {
        color: "#00FF00"
    }
}))

// TODO: swap this out later on
function numberWithCommas(valueStr: string) {
    return valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    return (
        <Box display="flex" flexDirection="column" component={"div"}>
            <Typography variant="h6">
                {"Current Balance"}
            </Typography>

            <Box display="flex" flexDirection="row" component={"div"}>
                <Typography component="h1" variant="h4">
                    {"$" + numberWithCommas(calculatePortfolioValue(props.data).toFixed(2))}
                </Typography>

                <Button variant="contained" className={classes.changeComponent}>
                    {"24.7%"}
                </Button>
            </Box>
            <Typography variant="h6" className={classes.changeValueComponent}>
                {"+$182.23"}
            </Typography>
        </Box>
        // TODO: Display list of cryptos recieved (user's portfolio of cryptos)
    )
}

export default Portfolio