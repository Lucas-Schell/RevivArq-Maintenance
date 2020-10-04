import React from "react";
import "./styles.css";
import { withRouter } from "react-router-dom";

// Helpers
// import {show_stringify} from 'helpers/json'

// Component Library
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";

// Services
import { list } from "services/user";

// Internal components
import UserDialogBox from "components/DialogBoxes/UserDialogForm";

const initialState = {
    render: undefined,
    contains: undefined,
    sort: undefined
};

class UserListCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = () => {
        this.renderUserCards();
    };

    handleChange = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        });
        this.renderUserCards();
    };

    renderUserCards = async () => {
        const { contains, sort } = this.state;
        const users = await list(contains, sort); // contains: string, sort: string, isAscending: boolean
        console.log(users);
        const render = users.data.map((user) => {
            return (
                <Card className="user-card" key={user.id}>
                    <CardHeader title={user.name} />
                    <br />
                    {user.username}
                    <br />
                    {user.email}
                    <br />
                    <div>
                        <UserDialogBox id={user.id} />
                    </div>
                </Card>
            );
        });

        this.setState({ render: render });
        return render;
    };

    render() {
        const { render } = this.state;
        if (render) {
            return (
                <div className="container">
                    {/* Search Bar */}
                    <TextField
                        id="search-bar"
                        name="contains"
                        label="Buscar usuários"
                        placeholder="Digite algum atributo de usuário..."
                        className="search-bar"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />

                    <br />
                    <br />

                    {/* Cards */}
                    <div className="cards-container">{render}</div>
                    {/* {show_stringify('State', this.state, 1)} */}
                </div>
            );
        } else {
            return (
                <div className="container">
                    Carregando cartões de usuários...
                </div>
            );
        }
    }
}

export default withRouter(UserListCards);
