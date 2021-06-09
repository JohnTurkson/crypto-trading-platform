import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
    Home,
    Profile
} from './pages'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
