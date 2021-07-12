import { Route, Switch, useLocation, useParams} from "react-router-dom"
import { useState } from "react"
import Page from "./components/Page"
import { Overview, Prices, Profile } from "./pages"
import { Landing } from "./pages/Landing"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import CryptoPriceList from "./containers/CryptoPriceList"
import { TradePage } from "./pages/TradePage"
import Discover from "./pages/Discover"
import CoinPage from "./pages/CoinPage"


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
            <Switch>
                <Route path="/sign-in">
                    <SignIn
                        data={signInData}
                        onDataChange={setSignInData}
                        onSubmit={event => event.preventDefault()}/>
                </Route>
                <Route path="/sign-up">
                    <SignUp
                        data={signUpData}
                        onDataChange={setSignUpData}
                        onSubmit={event => event.preventDefault()}/>
                </Route>
                <Route path="/overview">
                    <Page>
                        <Overview/>
                    </Page>
                </Route>
                <Route path="/trade">
                    <Page>
                        <TradePage/>
                    </Page>
                </Route>
                <Route path="/prices">
                    <Page>
                        <Prices/>
                    </Page>
                </Route>
                <Route path="/discover">
                    <Page>
                        <Discover/>
                    </Page>
                </Route>
                <Route path="/profile">
                    <Page>
                        <Profile/>
                    </Page>
                </Route>
                <Route exact path="/">
                    <Landing/>
                </Route>
                <Route path= {"/coin/" + name}  >
                    <Page>
                        <CoinPage name = {name}/>
                    </Page>

                </Route>
            </Switch>
    )
}

export default App
