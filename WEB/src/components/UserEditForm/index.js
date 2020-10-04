import React from "react";
import "./styles.css";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Constants } from "../../../configs/constants";
import {
    InputLabel,
    Checkbox,
    FormControlLabel,
    FormControl
} from "@material-ui/core";
import { bool } from "prop-types";
import { editReform } from "../../../services/reforms/index";
import { showNotification } from "components/Notification";

export default class UserEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            lastName: "",
            whatsapp: "",
            cpf: "",
            cnpj: "",
            civilStatus: "",
            address: {
                cep: "",
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "",
                uf: ""
            },
            errors: {}
        };
    }

    componentDidMount() {
        const { user } = this.props;

        if (user) {
            this.setState({
                name: user.name,
                establishmentType: reform.establishmentType,
                status: reform.status,
                area: reform.area,
                address: reform.address,
                reformItens: reform.reformItens,
                goal: reform.goal,
                restrictions: reform.restrictions,
                budgetLimit: reform.budgetLimit,
                phone: reform.phone
            });
        }
    }
}
export default withRouter(UserEditForm);
