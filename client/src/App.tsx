import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page from './components/Page';
import {
    Home,
    Profile
} from './pages'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/profile">
                    <Page>
                        <Profile />
                    </Page>
                </Route>
                <Route path="/">
                    <Page>
                        <Home />
                    </Page>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
