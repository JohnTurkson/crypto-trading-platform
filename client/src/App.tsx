import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page from "./components/Page";
import {
    Home,
    Profile
} from "./pages"
import SignUpForm, { SignUpInformation } from "./pages/SignUpForm"
import { useState } from "react"



function App() {
    const [signUpInformation, setSignUpInformation] = useState({
        name: "",
        email: "",
        password: "",
    })
    
    return (
        <SignUpForm information={signUpInformation} onInformationChange={setSignUpInformation}/>
        
        // <Router>
        //     <Switch>
        //         <Route path="/profile">
        //             <Page>
        //                 <Profile />
        //             </Page>
        //         </Route>
        //         <Route path="/">
        //             <Page>
        //                 <Home />
        //             </Page>
        //         </Route>
        //     </Switch>
        // </Router>
    )
}

export default App
