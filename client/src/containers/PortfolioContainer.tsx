import Container from "@material-ui/core/Container"
import CreatePortfolio from "../components/CreatePortfolio"
import PortfolioData from "../components/PortfolioData"
import PortfolioSelect from "../components/PortfolioSelect"

import "../styles/portfolio.css"

const PortfolioContainer = () => {
    return (
        <div id="portfolio_container">
            <div id="portfolio_utility_container">
                <CreatePortfolio />
                <PortfolioSelect />
            </div>
            <PortfolioData />
        </div>
    )
}

export default PortfolioContainer