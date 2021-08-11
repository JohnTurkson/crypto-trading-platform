import {AppBar, Button, createMuiTheme, makeStyles, MuiThemeProvider, Tab, Tabs, Toolbar} from "@material-ui/core"
import { useAuth } from "../context/Auth"
import {useEffect, useState} from "react"

const useStyles = makeStyles(theme => ({
    navigation: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectedTab: {
        textDecoration: "underline"
    },
    tabItem: {
        textTransform: "none",
    },
    logoutButton: {
        margin: "8px",
        textTransform: "none",
    },

}))

const theme = createMuiTheme({
    palette: {
        secondary: {
            light: '#fff',
            main: '#fff',
            dark: '#fff',
            contrastText: '#fff',
        },
    },
});

export function Navbar() {
    const classes = useStyles()
    const {logout} = useAuth()
    const [value, setValue] = useState(Number(localStorage.getItem("selectedTab")) ?? 0)

    const handleChange = (event, newValue) => {
        localStorage.setItem("selectedTab", newValue)
        setValue(newValue)
    };

    return (
        <>
            <MuiThemeProvider theme={theme}>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar className={classes.navigation}>
                    <Tabs
                    value={value}
                    onChange={handleChange}>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="Portfolio"
                            href="/overview"
                            />
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="Trade"
                            href="/trade"/>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="Prices"
                            href="/prices"/>
                        <Tab
                            className={classes.tabItem}
                            component="a"
                            label="NFTs"
                            href="/nfts"/>
                    </Tabs>
                    <Button
                        className={classes.logoutButton}
                        onClick={() => logout()}
                        variant="outlined"
                        color="inherit">
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        </>
    )
}
