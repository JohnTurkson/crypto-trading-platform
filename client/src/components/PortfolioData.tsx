import { useEffect, useState } from "react"
import { getPortfolioDataRequest } from "../requests/PortfolioRequests"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom"
import { coinsWithImageLink } from "../constants";
import { Typography } from "@material-ui/core";
import { Asset } from "../../../server/src/data/Asset"

const useStyles = makeStyles(theme => ({
    tableContainer: {
        maxWidth: "800px",
    },
    icon: {
        height: "32px",
        width: "32px"
    },
    tableCell: {
        width: "150px"
    },
    message: {
        marginTop: "50px"
    }
}))

const PortfolioData = ({ portfolioId, loadingPortfolio, assets, setAssets, loadingData, setLoadingData }
    : { portfolioId: string, loadingPortfolio: boolean, assets: Asset[], setAssets, loadingData: boolean, setLoadingData }) => {
    const classes = useStyles()

    useEffect(() => {
        const getPortfolioData = async () => {
            setLoadingData(true)
            if (!loadingPortfolio) {
                if (portfolioId != "") {
                    const data = await getPortfolioDataRequest(portfolioId)
                    setAssets(data)
                }
                setLoadingData(false)
            }
        }

        getPortfolioData()
    }, [portfolioId, loadingPortfolio])

    return (
        <div id="portfolio_data_container">
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableCell}>Asset</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Name</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { !loadingData && assets.map(asset => (
                            <TableRow key={asset.name}>
                                <TableCell align="center" className={classes.tableCell}>
                                    {
                                        coinsWithImageLink.hasOwnProperty(asset.name) &&
                                        <Link to={`/coin/${coinsWithImageLink[asset.name].name}`}>
                                            <img src={coinsWithImageLink[asset.name].imageUrl} className={classes.icon}></img>
                                        </Link>
                                    }
                                </TableCell>
                                <TableCell align="center" className={classes.tableCell}>{asset.name}</TableCell>
                                <TableCell align="center" className={classes.tableCell}>{asset.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                loadingData ?
                <Typography align="center" variant="h6" className={classes.message}>Loading...</Typography> :
                assets.length == 0 ?
                <Typography align="center" variant="h6" className={classes.message}>No assets</Typography> : null
            }
        </div>
    )
}

export default PortfolioData