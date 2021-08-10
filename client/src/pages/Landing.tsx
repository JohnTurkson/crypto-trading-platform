import { AppBar, Box, Button, Container, makeStyles, Toolbar, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    navigation: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    navigationItem: {
        margin: "4px",
    },
    headline: {
        margin: "32px",
    },
    joinButton: {
        margin: "8px",
        textTransform: "none",
    },
}))

export interface LandingProps {

}

export function Landing(props: LandingProps) {
    const classes = useStyles()

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar className={classes.navigation}>
                    <Button
                        href="/"
                        variant="text"
                        color="primary">
                    </Button>
                    <Box>
                        <Button
                            className={classes.navigationItem}
                            href="/sign-in"
                            variant="outlined"
                            color="primary">
                            Sign In
                        </Button>
                        <Button
                            className={classes.navigationItem}
                            href="/sign-up"
                            variant="outlined"
                            color="primary">
                            Sign Up
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container className={classes.container}>
                <Typography className={classes.headline} component="h1" variant="h2" align="center">
                    Trade Crypto, Lightning Fast
                </Typography>
                <Button
                    className={classes.joinButton}
                    href="/sign-up"
                    variant="outlined"
                    color="primary">
                    Join Now for Free
                </Button>
            </Container>
        </>
    )
}
