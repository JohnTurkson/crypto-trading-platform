import { Container, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    container: {
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    headline: {
        margin: "32px",
    },
}))
export default () => {
    const classes = useStyles()
    
    return (
        <Container className={classes.container}>
            <Typography className={classes.headline} component="h1" variant="h2" align="center">
                Coming Soon
            </Typography>
        </Container>
    )
}
