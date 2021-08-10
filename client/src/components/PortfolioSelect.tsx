import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { styled } from '@material-ui/core/styles';
import Portfolio from "../../../server/src/data/Portfolio"
import { makeStyles } from "@material-ui/core/styles";
import { Dispatch, SetStateAction, ChangeEvent } from "react"

const StyledCard = styled(Card)({
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    marginTop: "50px"
})

const StyledTypography = styled(Typography)({
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textDecorationColor: "#3f51b5",
    textUnderlineOffset: "0.2em"
})

const StyledForm = styled(FormControl)({
    marginTop: "30px"
})

const StyledMenuItem = styled(MenuItem)({
    backgroundColor: "white !important"
})

const useStyles = makeStyles(theme => ({
    menuPaper: {
        maxHeight: "300px"
    }
}))

const PortfolioSelect = ({ portfolios, portfolioId, setPortfolioId }: 
    { portfolios: Portfolio[], portfolioId: string, setPortfolioId: Dispatch<SetStateAction<string>> }) => {
    const classes = useStyles();

    return (
        <StyledCard>
            <StyledTypography align="left" variant="h6" >Select Portfolio</StyledTypography>
            <StyledForm variant="outlined">
                <Select
                    id="select_portfolio"
                    onChange={(e: ChangeEvent<{ value: unknown }>) => setPortfolioId(e.target.value as string)}
                    value={portfolioId}
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
                    {portfolios.map(portfolio => <StyledMenuItem key={portfolio.id} value={portfolio.id}>{portfolio.name}</StyledMenuItem>)}
                </Select>
            </StyledForm>
        </StyledCard>
    )
}

export default PortfolioSelect