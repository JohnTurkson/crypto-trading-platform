import { Navbar } from "./Navbar"
import styled from "styled-components"
import { ReactNode } from "react"

const MainContentContainer = styled.div`
  margin-top: 5em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Page = ({children}: { children: ReactNode}) => {
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
