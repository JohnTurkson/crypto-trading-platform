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
    const [cryptos, setCryptos] = useState([])

    async function fetchData() {
        let url = "/data/coins.json";
        const response = await fetch(url)
        const json = await response.json()
        setCryptos(json["coins"])
    }


    useEffect(() => {
        fetchData()
    }, []);


    // TODO: useEffect hook with setCryptos to fetch crypto data
//            {createCryptoListing(cryptos)}
    return (
        <CryptoContainer>
            {createPortfolio(cryptos)}
        </CryptoContainer>
    )
}

export default CryptoPriceList