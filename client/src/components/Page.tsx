import Navbar from "./Navbar"

const Page = ({ children }) => {
    return (
        <Navbar>
            {children}
        </Navbar>
    )
}

export default Page