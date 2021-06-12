import React, { Dispatch, FormEvent, SetStateAction } from "react"
import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"
import { handleStateChange } from "../handlers/Handlers"
import { SignUpData } from "./data/SignUpData"

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

export interface SignUpProps {
    data: SignUpData
    onDataChange: Dispatch<SetStateAction<SignUpData>>
    onSubmit: (event: FormEvent) => void
}

export function SignUp(props: SignUpProps) {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography component="h1" variant="h5">
                {"Sign Up"}
            </Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    value={props.data.name}
                    onChange={handleStateChange("name", props.data, props.onDataChange)}
                />
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
                    {"Sign Up"}
                </Button>
            </form>
        </Container>
    )
}
