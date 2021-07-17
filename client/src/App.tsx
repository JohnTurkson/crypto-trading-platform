import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import { ReactNode } from "react"
import {  Route, Switch, useLocation} from "react-router-dom"
import { useState } from "react"
import Page from "./components/Page"
import { Overview, Prices, Profile } from "./pages"
import { Landing } from "./pages/Landing"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { TradePage } from "./pages/TradePage"
import Discover from "./pages/Discover"
import CoinPage from "./pages/CoinPage"

import { AuthProvider, useAuth } from "./context/Auth"

const PrivateRoute = ({ path, children }: { path: string, children: ReactNode }) => {
    const { isAuthed } = useAuth()
    return (
        isAuthed ? 
        <Route path={path}>
            {children}
        </Route> :
        <Redirect to="/sign-in" />
    )
}

const NoAuthRoute = ({ path, children }: { path: string, children: ReactNode }) => {
    const { isAuthed } = useAuth()
    return (
        !isAuthed ? 
        <Route path={path}>
            {children}
        </Route> :
        <Redirect to="/overview" />
    )
}

function App() {
    const [signInData, setSignInData] = useState({email: "", password: ""})
    const [signUpData, setSignUpData] = useState({name: "", email: "", password: ""})
    let location = useLocation()
    const s : any = location.state
    let name
    if (s != undefined) name = s.name
    //let url
    //if (s != undefined) url = s.url



    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <NoAuthRoute path="/sign-in">
                        <SignIn />
                    </NoAuthRoute>
                    <NoAuthRoute path="/sign-up">
                        <SignUp />
                    </NoAuthRoute>
                    <PrivateRoute path="/overview">
                        <Page>
                            <Overview/>
                        </Page>
                    </PrivateRoute>
                    <PrivateRoute path="/trade">
                        <Page>
                            <TradePage/>
                        </Page>
                    </PrivateRoute>
                    <PrivateRoute path="/prices">
                        <Page>
                            <Prices/>
                        </Page>
                    </PrivateRoute>
                    <PrivateRoute path="/discover">
                        <Page>
                            <Discover/>
                        </Page>
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <Page>
                            <Profile/>
                        </Page>
                    </PrivateRoute>
                    <PrivateRoute path= {"/coin/" + name}  >
                        <Page>
                            <CoinPage name = {name}/>
                        </Page>
                    </PrivateRoute>
                    <NoAuthRoute path="/">
                        <Landing/>
                    </NoAuthRoute>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default App
