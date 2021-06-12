import React, {Dispatch, FormEvent, SetStateAction} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: "block"
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
})

export interface CoinProps {
    url: string
    name: string
    price: number
}

export function Coin(props: CoinProps) {
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>

    return (
        <Card className={classes.root}>
            <CardContent>
                <CardMedia src={props.url}></CardMedia>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default Coin