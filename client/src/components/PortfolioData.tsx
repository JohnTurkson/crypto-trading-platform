import { useEffect, useRef, useState } from "react"
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
    const [priceData, setPriceData] = useState({ "USD": 1 })
    const [loadingSum, setLoadingSum] = useState(true)
    const ws = useRef(null)

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

    useEffect(() => {
        ws.current = new WebSocket("wss://crypto-data-stream.johnturkson.com")

        return () => ws.current.close()
    }, [])
    
    useEffect(() => {
        if (!ws.current || assets.length == 0) return

        ws.current.onmessage = message => {
            setLoadingSum(true)
            const currData = {...priceData}
            const json = JSON.parse(message.data)

            const assetName = json["asset"].split("-")[0]
            const price = json["price"]
            
            currData[assetName] = price

            setPriceData(currData)
            setLoadingSum(false)
        }
    })

    const getSum = () => {
        let sum = 0;
        assets.forEach(asset => {
            sum += priceData[asset.name] ? priceData[asset.name] * parseFloat(asset.amount) : 0
        })
        return sum.toFixed(2)
    }

    return (
        <div id="portfolio_data_container">
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableCell}>Asset</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Name</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Amount</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Value</TableCell>
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
                                <TableCell align="center" className={classes.tableCell}>
                                    {
                                        priceData.hasOwnProperty(asset.name) ?
                                        `${(parseFloat(priceData[asset.name]) * parseFloat(asset.amount)).toFixed(2)}` :
                                        "Loading..."
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        {
                            !loadingData && assets.length != 0 &&
                            <TableRow>
                                <TableCell colSpan={3} align="center" >Total</TableCell>
                                <TableCell align="center">{loadingSum ? "Loading..." : getSum()}</TableCell>
                            </TableRow>
                        }
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