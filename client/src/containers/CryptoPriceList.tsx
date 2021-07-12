import {Box, Button, makeStyles} from "@material-ui/core";
import {useEffect, useState } from "react"
import styled from "styled-components"
import Portfolio from "../components/Portfolio";

const CryptoContainer = styled.div`
    display: flex;
    flex-direction: row;
`

// TODO: change any type
const createCryptoListing = (cryptos: any[]): JSX.Element => {
    // return Coin components based on JSON data
    return(

        <Box ml={5} display={"flex"} flexDirection={"column"}>{cryptos.map(
            crypto =>
            {
                return (<p>{crypto.name}</p>)
            })
        }</Box>
    )
}

// TODO: change any type
const createPortfolio = (cryptos: any[]): JSX.Element => {
    // return Coin components based on JSON data
    return(
        <Portfolio data={cryptos} />
    )
}


const CryptoPriceList = () => {
    const [cryptos, setCryptos] = useState([
        {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/183px-BTC_Logo.svg.png",
        name: "Bitcoin",
        price: 30000,
        amountOwned: 2,

    },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png",
            name: "Ethereum",
            price: 3000,
            amountOwned: 3
        },
        {
            url: "https://static01.nyt.com/images/2021/05/16/fashion/13DOGECOIN-1/13DOGECOIN-1-mediumSquareAt3X.jpg",
            name: "Dogecoin",
            price: 0.50,
            amountOwned: 10000
        }])

        /*
    async function fetchData() {
        let url = "data/coins.json";
        const response = await fetch(url)
        const json = await response.json()
        setCryptos(json["coins"])
    }



    useEffect(() => {
        fetchData()
    }, []);


         */
    // TODO: useEffect hook with setCryptos to fetch crypto data
//            {createCryptoListing(cryptos)}
    return (
        <CryptoContainer>
            {createPortfolio(cryptos)}
        </CryptoContainer>
    )
}

export default CryptoPriceList