import Navbar from "./Navbar"
import styled from 'styled-components'

const MainContentContainer = styled.div`
    margin-top: 5em;
    padding: 1em;
`

const Page = ({ children }) => {
    return (
        <>
            <Navbar />
            <MainContentContainer>
                {children}
            </MainContentContainer>
        </>
        
    )
}

export default Page