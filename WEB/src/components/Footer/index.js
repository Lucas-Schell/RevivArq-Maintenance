import React from "react";
import "./styles.css";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import logo_ages from "../../Assets/logo_ages.png";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: null,
            render: null
        };
    }
    redirect = (path) => {
        const { history } = this.props;
        history.push(path);
    };
    render() {
        const { display } = this.props;
        const { render } = this.state;

        return (
            <div className="App-footer">
                <Typography
                    className="txt"
                    style={{
                        fontFamily: "Playfair Display",
                        alignItems: "flex-end"
                    }}
                >
                    Agência Experimental de Engenharia de Software - PUCRS -
                    Escola Politécnica. Todos os direitos reservados ©.
                </Typography>
                <img src={logo_ages} className="img" alt="logo" />
                {render}
            </div>
        );
    }
}

export default withRouter(Footer);
