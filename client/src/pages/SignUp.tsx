import { FormEvent, useState } from "react"
import { AppBar, Button, Container, makeStyles, TextField, Toolbar, Typography } from "@material-ui/core"
import { handleStateChange } from "../handlers/Handlers"
import { useAuth } from "../context/Auth"

const useStyles = makeStyles(theme => ({
    navigation: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    container: {
        marginTop: theme.spacing(2),
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    navigationItem: {
        margin: "4px"
    },
    title: {
        marginTop: theme.spacing(1)
    },
    form: {
        marginTop: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(2)
    }
}))

export function SignUp() {
    const [signUpData, setSignUpData] = useState({name: "", email: "", password: ""})
    const {signUp} = useAuth()
    const classes = useStyles()
    
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signUp(signUpData.email, signUpData.password)
    }
    
    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar className={classes.navigation}>
                    <Button
                        className={classes.navigationItem}
                        href="/"
                        variant="text"
                        color="primary">
                        Home
                    </Button>
                    <Button
                        className={classes.navigationItem}
                        href="/sign-in"
                        variant="outlined"
                        color="primary">
                        Sign In
                    </Button>
                </Toolbar>
            </AppBar>
            
            <Container className={classes.container}>
                <Typography className={classes.title} component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={e => submitHandler(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Name"
                        value={signUpData.name}
                        onChange={handleStateChange("name", signUpData, setSignUpData)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email"
                        value={signUpData.email}
                        onChange={handleStateChange("email", signUpData, setSignUpData)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Password"
                        value={signUpData.password}
                        onChange={handleStateChange("password", signUpData, setSignUpData)}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit">
                        Sign Up
                    </Button>
                </form>
            </Container>
        </>
    )
}
