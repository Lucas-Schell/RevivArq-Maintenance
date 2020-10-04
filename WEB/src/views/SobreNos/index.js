import React from "react";
import Page from "views/Page";
import "./styles.css";

class SobreNos extends Page {
    unauthenticated = () => {
        return <h1>Sobre Nos Apagada</h1>;
    };

    authenticated = () => {
        return <h1> Sobre Nos Apagada</h1>;
    };
}

export default SobreNos;
