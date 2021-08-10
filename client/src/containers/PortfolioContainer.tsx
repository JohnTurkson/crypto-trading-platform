import CreatePortfolio from "../components/CreatePortfolio"
import PortfolioData from "../components/PortfolioData"
import PortfolioSelect from "../components/PortfolioSelect"
import { useEffect, useState } from "react"
import { getPortfoliosRequest } from "../requests/PortfolioRequests"
import Portfolio from "../../../server/src/data/Portfolio"

import "../styles/portfolio.css"

const PortfolioContainer = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([])
    const [portfolioId, setPortfolioId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

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
        <div id="portfolio_container">
            <div id="portfolio_sidebar_container">
                <PortfolioSelect portfolios={portfolios} portfolioId={portfolioId} setPortfolioId={id => setPortfolioId(id)} isLoading={loading} />
                <CreatePortfolio addHandler={portfolio => onAddPortfolio(portfolio)} />
            </div>
            <PortfolioData portfolioId={portfolioId} />
        </div>
    )
}

export default PortfolioContainer