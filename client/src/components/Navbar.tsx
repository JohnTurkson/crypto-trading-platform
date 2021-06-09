import { Link, useLocation } from 'react-router-dom'
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
    background-color: ${p => p.selected && '#A6B1A3'};

    &:hover {
        background-color: #A6B1A3;
    }
`

const Navbar = () => {
    const location = useLocation()

    return (
        <>
            <NavbarContainer>
                <StyledLink selected={location.pathname === '/'} to='/'>
                    Home
                </StyledLink>
                <StyledLink selected={location.pathname === '/profile'} to='/profile'>
                    Profile
                </StyledLink>
            </NavbarContainer>
        </>
    )
}

export default Navbar