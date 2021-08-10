import CreatePortfolio from "../components/CreatePortfolio"
import PortfolioData from "../components/PortfolioData"
import PortfolioSelect from "../components/PortfolioSelect"
import { useEffect, useState } from "react"
import { getPortfoliosRequest } from "../requests/PortfolioRequests"
import Portfolio from "../../../server/src/data/Portfolio"
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import { styled } from '@material-ui/styles';

import "../styles/portfolio.css"

const StyledSuccessAlert = styled(Alert)({
    marginTop: "-80px",
    marginBottom: "20px"
})

const PortfolioContainer = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([])
    const [portfolioId, setPortfolioId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)


    useEffect(() => {
        const getPortfolios = async () => {
            const data = await getPortfoliosRequest("2")
            setPortfolios(data)
            if (data.length > 0) {
                setPortfolioId(data[0].id)
            }
            setLoading(false)
        }

        getPortfolios()
    }, [])

    const onAddPortfolio = (portfolio: Portfolio) => {
        setPortfolios([...portfolios, portfolio])
        setPortfolioId(portfolio.id)
    }

    return (
        <div id="portfolio_column_container">
            <Grow in={showSuccessAlert}>
                <StyledSuccessAlert severity="success">Portfolio created successfully!</StyledSuccessAlert>
            </Grow>
            <div id="portfolio_container">
                <div id="portfolio_column_container">
                    <PortfolioSelect portfolios={portfolios} portfolioId={portfolioId} setPortfolioId={id => setPortfolioId(id)} isLoading={loading} />
                    <CreatePortfolio
                        addHandler={portfolio => onAddPortfolio(portfolio)}
                        setShowSuccessAlert={b => setShowSuccessAlert(b)}
                    />
                </div>
                <PortfolioData portfolioId={portfolioId} />
            </div>
        </div>
    )
}

export default PortfolioContainer