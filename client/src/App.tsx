import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useState } from "react"
import Page from "./components/Page"
import { Overview, Profile } from "./pages"
import { Landing } from "./pages/Landing"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"

function App() {
    const [signInData, setSignInData] = useState({email: "", password: ""})
    const [signUpData, setSignUpData] = useState({name: "", email: "", password: ""})

    return (
        <Router>
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
                        <Overview/>
                    </Page>
                </Route>
                <Route path="/discover">
                    <Page>
                        <Overview/>
                    </Page>
                </Route>
                <Route path="/profile">
                    <Page>
                        <Profile/>
                    </Page>
                </Route>
                <Route path="/">
                    <Landing/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
