import { Button, Container, makeStyles, Typography } from "@material-ui/core"

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
    joinButton: {
        margin: "8px",
        textTransform: "none",
    },
}))
export default () => {
    const classes = useStyles()
    
    return (
        <Container className={classes.container}>
            <Typography className={classes.headline} component="h1" variant="h2" align="center">
                Coming Soon
            </Typography>
            <Button
                className={classes.joinButton}
                href="/sign-up"
                variant="outlined"
                color="primary">
                Stay Tuned
            </Button>
        </Container>
    )
}
