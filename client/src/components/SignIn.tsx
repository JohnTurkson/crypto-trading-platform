import React, { Dispatch, FormEvent, SetStateAction } from "react"
import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"
import { handleStateChange } from "../handlers/Handlers"
import { SignInData } from "./data/SignInData"

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        marginTop: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(2)
    }
}))

export interface SignInProps {
    data: SignInData
    onDataChange: Dispatch<SetStateAction<SignInData>>
    onSubmit: (event: FormEvent) => void
}

export function SignIn(props: SignInProps) {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography component="h1" variant="h5">
                {"Sign In"}
            </Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    value={props.data.email}
                    onChange={handleStateChange("email", props.data, props.onDataChange)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Password"
                    value={props.data.password}
                    onChange={handleStateChange("password", props.data, props.onDataChange)}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={props.onSubmit}>
                    {"Sign In"}
                </Button>
            </form>
        </Container>
    )
}
