import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { createPortfolioRequest } from '../requests/PortfolioRequests';

const StyledCard = styled(Card)({
    padding: "1em",
    display: "flex",
    flexDirection: "column"
})

const StyledTypography = styled(Typography)({
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textDecorationColor: "#3f51b5",
    textUnderlineOffset: "0.2em"
})

const StyledTextField = styled(TextField)({
    marginTop: "1em",
    width: "225px"
})

const StyledButton = styled(Button)({
    alignSelf: "center",
    marginTop: "1.75em",
    backgroundColor: "#3f51b5",
    color: "white",

    "&:hover": {
        color: "#3f51b5"
    }
})

const CreatePortfolio = () => {
    const [name, setName] = useState("")

    const submitHandler = () => {
        createPortfolioRequest("1", name)
        setName("")
    }

    return (
        <StyledCard>
            <StyledTypography align="left" variant="h6" >Create Portfolio</StyledTypography>
            <StyledTextField
                id="standard-basic"
                label="Portfolio name" 
                variant="filled"
                size="small"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <StyledButton variant="outlined" size="small" onClick={() => submitHandler()} >Submit</StyledButton>
        </StyledCard>
    )
}

export default CreatePortfolio