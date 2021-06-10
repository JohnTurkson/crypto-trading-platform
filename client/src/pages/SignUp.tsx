import React, { Dispatch, FormEvent, SetStateAction } from "react"
import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"

export interface SignUpInformation {
    name: string
    email: string
    password: string
}

interface SignUpFormProps {
    information: SignUpInformation
    onInformationChange: Dispatch<SetStateAction<SignUpInformation>>
    onSubmit: (event: FormEvent) => void
}

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

export default function SignUp(props: SignUpFormProps) {
    console.log(props.information.name)

    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Password"
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    color="primary">
                    {"Sign Up"}
                </Button>
            </form>
        </Container>
    )
}
