import React from "react";
import { withRouter } from "react-router-dom";

// Biblioteca de Componentes
import CadastroUsuario from "components/Forms/CadastroUsuario";

// Views
import Page from "views/Page";

// Serviços
import { create } from "services/user";

class CadastroPage extends Page {
    async registrarUsuario(usuario) {
        return await create(usuario, false);
    }

    authenticated = () => {
        return (
            <div className="container">
                <p>Você já está logado!</p>
            </div>
        );
    };

    unauthenticated = () => {
        return (
            <div>
                <CadastroUsuario registrarUsuario={this.registrarUsuario} />
            </div>
        );
    };
}

export default withRouter(CadastroPage);
