import Navbar from "./Navbar"
import styled from "styled-components"
import { ReactNode } from "react"
import {Container, makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    container: {
    }
}))

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
        <Container className={classes.container}>
            <Typography component="h3" variant="h5">
                {"Current Balance"}
            </Typography>

            <Typography component="h1" variant="h5">
                {"$" + calculatePortfolioValue(props.data)}
            </Typography>
        </Container>
        // TODO: Display list of cryptos recieved (user's portfolio of cryptos)
    )
}

export default Portfolio