import { Navbar } from "./Navbar"
import styled from "styled-components"
import { ReactNode } from "react"
import React from "react"

const MainContentContainer = styled.div`
  margin-top: 5em;
  padding: 1em;
`

const Page = ({children, tabIndex}: { children: ReactNode, tabIndex?: number }) => {
    return (
        <>
            <Navbar selected={tabIndex}/>
            <MainContentContainer>
                {children}
            </MainContentContainer>
        </>
    )
}

export default Page
