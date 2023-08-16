import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </BrowserRouter>
);
