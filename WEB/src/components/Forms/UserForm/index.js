import React from 'react'
import './styles.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

// import {show_stringify} from 'helpers/json'

import { create, read, update } from 'services/user'

import { withRouter } from 'react-router-dom'
import { Constants } from '../../../configs/constants'

const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',

    isLoading: false,
    errors: {}
}

/**
 *  Propriedades
 *        hideSubmit {true/false}: esconde o botão de submit
 *    reloadOnSubmission {true/false}: faz a página recarregar ao enviar um formulário com sucesso
 *    user {model} :  objeto usuário a ser enviado ao backend
 */
class UserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState

        if (props.id) {
            this.state = {
                ...this.state,
                id: props.id
            }
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }
        this.loadUserData()
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined)
        }
    }

    async loadUserData() {
        const { match } = this.props
        let id

        if (match.params.id || this.state.id) {
            this.setState({ isLoading: true })
        }

        if (match.params.id) {
            id = match.params.id
        } else if (this.state.id) {
            id = this.state.id
        }

        if (id) {
            const user = await read(id)
            if (user) {
                this.setState({
                    ...this.state,
                    ...user,
                    isLoading: false
                })
            } else {
                console.error('Error loading user...')
            }
        }
    }

    onSubmit(e) {
        if (e) {
            e.preventDefault()
        }

        this.setState({
            isLoading: true
        })

        let user = { ...this.state }
        delete user.isLoading
        delete user.errors

        if (user.id) {
            this.updateUser(user)
        } else {
            this.createUser(user)
        }
    }

    createUser = async (user) => {
        const { reloadOnSubmission } = this.props

        const status = await create(user, true)

        console.log('Criação usuário:', status)

        this.setState({
            isLoading: false
        })

        if (reloadOnSubmission && status.statusCode === Constants.successCode) {
            window.location.reload()
        }
    }

    updateUser = async (user) => {
        const { reloadOnSubmission } = this.props

        const status = await update(user)

        console.log('Atualização de usuário:', status)

        this.setState({
            isLoading: false
        })

        if (reloadOnSubmission && status.statusCode === Constants.successCode) {
            window.location.reload()
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderSubmitButton = () => {
        const { isLoading } = this.state
        const { hideSubmit } = this.props

        if (hideSubmit) {
            return <div></div>
        } else {
            return (
                <Button
                    className="submitBtn"
                    type="submit"
                    disabled={isLoading}
                >
                    {this.state.id ? 'Atualizar Usuário' : 'Criar Usuário'}
                </Button>
            )
        }
    }

    render() {
        const { name, email, username, password } = this.state
        const { isLoading, errors } = this.state

        return (
            <div className="container">
                <form onSubmit={this.onSubmit} autoComplete="off">
                    {/* Nome */}
                    <TextField
                        className="input"
                        name="name"
                        label="Nome"
                        onChange={this.onChange}
                        error={errors.name}
                        value={name}
                        required={true}
                        autoComplete="name"
                        disabled={isLoading}
                    />
                    <br />

                    {/* Email */}
                    <TextField
                        className="input"
                        name="email"
                        label="Email"
                        onChange={this.onChange}
                        error={errors.email}
                        value={email}
                        required={true}
                        autoComplete="email"
                        disabled={isLoading}
                    />
                    <br />

                    {/* Username */}
                    <TextField
                        className="input"
                        name="username"
                        label="Login"
                        onChange={this.onChange}
                        value={username}
                        required={true}
                        error={errors.username}
                        type="username"
                        autoComplete="username"
                        disabled={isLoading}
                    />
                    <br />

                    {/* Senha */}
                    <TextField
                        className="input"
                        name="password"
                        label={this.state.id ? 'Senha (Desativado)' : 'Senha'}
                        onChange={this.onChange}
                        value={password}
                        required={this.state.id ? false : true}
                        error={errors.password}
                        type="password"
                        autoComplete="password"
                        disabled={isLoading || this.state.id ? true : false}
                    />
                    <br />

                    {this.renderSubmitButton()}
                </form>
                {/* {show_stringify(this.state)} */}
            </div>
        )
    }
}

export default withRouter(UserForm);
