import { AppBar, Button, makeStyles, Tab, Tabs, Toolbar } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    navigation: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    tabItem: {
        textTransform: "none",
    },
    logoutButton: {
        margin: "8px",
        textTransform: "none",
    },
}))

export function Navbar({selected}: { selected?: number }) {
    const classes = useStyles()

    return (
        <>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar className={classes.navigation}>
                    <Tabs value={selected ?? false}>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="Portfolio"
                            href="/overview"/>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="Trade"
                            href="/trade"/>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="Discover"
                            href="/discover"/>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="NFTs"
                            href="nfts"/>
                    </Tabs>

                    <Button
                        className={classes.logoutButton}
                        href="/"
                        variant="outlined"
                        color="inherit">
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}
