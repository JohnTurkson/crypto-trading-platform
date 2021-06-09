import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavbarContainer = styled.div`
    background-color: #B7C2B4;
    display: flex;
`

const StyledLink = styled(Link)`
    padding: 1em;
    font-weight: bold;
    color: black;
    text-decoration: none;
    font-size: 1.5em;

    &:hover {
        background-color: #A6B1A3;
    }
`

const Navbar = () => {
    return (
        <>
            <NavbarContainer>
                <StyledLink to='/'>
                    Home
                </StyledLink>
                <StyledLink to='/profile'>
                    Profile
                </StyledLink>
            </NavbarContainer>
        </>
    )
}

export default Navbar