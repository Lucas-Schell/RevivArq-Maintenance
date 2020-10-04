import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import registerServiceWorker from "registerServiceWorker";

import { BrowserRouter } from "react-router-dom";
import App from "boot";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

document.body.style.width = "100%";
document.body.style.height = "100%";

registerServiceWorker();
