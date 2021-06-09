import { Link } from 'react-router-dom'

const Navbar = ({ children }) => {
    return (
        <>
            <Link to='/'>
                Home
            </Link>
            <Link to='/profile'>
                Profile
            </Link>
            {children}
        </>
    )
}

export default Navbar