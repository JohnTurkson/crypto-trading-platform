import "./index.css"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import * as ReactDOM from "react-dom"
import * as React from "react"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
