import { useState } from "react"
import styled from "styled-components"

const CryptoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

// TODO: change any type
const createCryptoListing = (cryptos: any[]): JSX.Element => {
    // return Coin components based on JSON data
    return(
        <div>Coin</div>
    )
}

const CryptoPriceList = () => {
    const [cryptos, setCryptos] = useState([])
    
    // TODO: useEffect hook with setCryptos to fetch crypto data

    return (
        <CryptoContainer>
            {createCryptoListing(cryptos)}
        </CryptoContainer>
    )
}

export default CryptoPriceList