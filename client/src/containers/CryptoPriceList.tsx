import { Box } from "@material-ui/core"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Portfolio from "../components/Portfolio"

const CryptoContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const createCryptoListing = (cryptos: any[]): JSX.Element => {
    return (
        <Box ml={5} display={"flex"} flexDirection={"column"}>{cryptos.map(
            crypto => (<p>{crypto.name}</p>))
        }</Box>
    )
}

const createPortfolio = (cryptos: any[]): JSX.Element => {
    return (
        <Portfolio data={cryptos}/>
    )
}

const CryptoPriceList = () => {
    const [cryptos, setCryptos] = useState([])
    
    async function fetchData() {
        let url = "/data/coins.json"
        const response = await fetch(url)
        const json = await response.json()
        setCryptos(json["coins"])
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <CryptoContainer>
            {createPortfolio(cryptos)}
        </CryptoContainer>
    )
}

export default CryptoPriceList
