import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { useState, ChangeEvent } from 'react';
import { getPortfolioDataRequest, withdrawAssetRequest } from '../requests/PortfolioRequests';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../context/Auth';
import Button from '@material-ui/core/Button';
import { Asset } from "../../../server/src/data/Asset"
import Alert from '@material-ui/lab/Alert';

const StyledCard = styled(Card)({
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px"
})

const StyledTypography = styled(Typography)({
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textDecorationColor: "#3f51b5",
    textUnderlineOffset: "0.2em"
})

const StyledMessage = styled(Typography)({
    marginTop: "0.5em",
    fontSize: "14px"
})

const StyledForm = styled(FormControl)({
    marginTop: "20px"
})

const StyledMenuItem = styled(MenuItem)({
    backgroundColor: "white !important"
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

const StyledAlert = styled(Alert)({
    width: "175px",
    alignSelf: "center",
    marginTop: "10px"
})

const useStyles = makeStyles(theme => ({
    menuPaper: {
        maxHeight: "300px"
    }
}))

const WithdrawAsset = ({ portfolioId, assets, setAssets, loadingData, setLoadingData }
    : { portfolioId: string, assets: Asset[], setAssets, loadingData: boolean, setLoadingData }) => {
    const classes = useStyles()
    const [selectedAsset, setSelectedAsset] = useState("")
    const [amount, setAmount] = useState("")
    const [showError, setShowError] = useState(false)
    const { userId, authToken } = useAuth()

    const submitHandler = async () => {
        if (selectedAsset == "" || amount == "" || isNaN(parseInt(amount)) || parseInt(amount) <= 0 || !haveSufficientAmount()) {
            setShowError(true)
        } else {
            setShowError(false)
            setAmount("")
            await withdrawAssetRequest(authToken, userId, portfolioId, selectedAsset, amount)
            setLoadingData(true)
            const newAssets = await getPortfolioDataRequest(portfolioId)
            setAssets(newAssets)
            setLoadingData(false)
        }
    }
    
    const haveSufficientAmount = () => {
        const targetAsset = assets.find(asset => asset.name == selectedAsset)
        return targetAsset.amount >= amount
    }

    return (
        <StyledCard>
            <StyledTypography align="left" variant="h6">Withdraw Asset</StyledTypography>
            {
                loadingData ?
                    <StyledMessage align="left" variant="h6">Loading...</StyledMessage> :
                    assets.length == 0 ?
                    <StyledMessage align="left" variant="h6">No assets</StyledMessage> :
                    <>
                        <StyledForm variant="outlined">
                            <Select
                                id="select_portfolio"
                                onChange={(e: ChangeEvent<{ value: unknown }>) => setSelectedAsset(e.target.value as string)}
                                value={selectedAsset}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null,
                                    classes: { paper: classes.menuPaper }
                                }}
                            >
                                {assets.map(asset => <StyledMenuItem key={asset.name} value={asset.name}>{asset.name}</StyledMenuItem>)}
                            </Select>
                        </StyledForm>
                        <StyledTextField
                            id="standard-basic"
                            label="Withdraw amount" 
                            variant="filled"
                            size="small"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        { showError && <StyledAlert severity="error">Invalid input!</StyledAlert> }
                        <StyledButton variant="outlined" size="small" onClick={() => submitHandler()} >Submit</StyledButton>
                    </>
            }
        </StyledCard>
    )
}

export default WithdrawAsset