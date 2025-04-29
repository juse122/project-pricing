import "./assets/css/index.css"

import React from "react"
import ReactDOM from "react-dom/client"

import App from "src/components/App"

const reactRootHTMLElement = document.getElementById("root")!
const reactRoot = ReactDOM.createRoot(reactRootHTMLElement)

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
