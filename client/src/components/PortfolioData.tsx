import { useEffect, useState } from "react"
import Asset from "../../../server/src/data/Asset"
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

const useStyles = makeStyles(theme => ({
    tableContainer: {
        maxWidth: "800px",
        marginLeft: "300px"
    },
    icon: {
        height: "32px",
        width: "32px"
    },
    tableCell: {
        width: "150px"
    }
}))

const PortfolioData = ({ portfolioId }) => {
    const classes = useStyles()
    const [assets, setAssets] = useState<Asset[]>([])

    useEffect(() => {
        const getPortfolioData = async () => {
            if (portfolioId != "") {
                const data = await getPortfolioDataRequest(portfolioId)
                setAssets(data)
            }
        }

        getPortfolioData()
    }, [portfolioId])

    return (
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
                    {assets.map(asset => (
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
    )
}

export default PortfolioData