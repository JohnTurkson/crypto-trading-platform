import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    icon: {
        minWidth: 50,
        width: 10
    }
});

export default function BasicTable() {
    const classes = useStyles();

    const [list, setList] = useState([{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png",name:"Bitcoin",price:30000},
        {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png", name:"Ethereum",price:3000},
        {url: "https://static01.nyt.com/images/2021/05/16/fashion/13DOGECOIN-1/13DOGECOIN-1-mediumSquareAt3X.jpg", name: "Dogecoin", price: 0.50}]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Coin</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price&nbsp;(USD$)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <img src={row.url} className = {classes.icon}></img>
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}