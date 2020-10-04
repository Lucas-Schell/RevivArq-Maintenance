import React from 'react'
import './styles.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { login } from 'services/auth'
import { showNotification } from 'components/Notification'
import { withRouter } from 'react-router-dom'
import { Constants } from 'configs/constants'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            errors: {},
            errorMessage: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    async onSubmit(e) {
        e.preventDefault()

        const { username, password } = this.state

        if (!username) {
            this.setState({ errors: { username: true } })
            return
        }

        if (!password) {
            this.setState({ errors: { password: true } })
            return
        }

        const response = await login(username, password, false)

        if (
            response.statusCode === Constants.successCode &&
            sessionStorage.getItem('token')
        ) {
            const { history } = this.props
            const admin = sessionStorage.getItem('isAdmin')
            history.push(
                this.props.goToNewRequest && admin !== 'true'
                    ? '/FacaPedido'
                    : '/'
            )
            this.props.closeModal()
            this.props.refreshHeader()
            showNotification('Login realizado com sucesso!')
            return true
        } else {
            showNotification(response.statusDesc, '', 'danger')
            return false
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    redirect = (path) => {
        const { history } = this.props
        history.push(path)
    }

    render() {
        const { username, password, isLoading, errors } = this.state

        return (
            <div className="login-container">
                <form onSubmit={this.onSubmit} className="form-login-usuario">
                    <h1>Acesse sua conta</h1>
                    <TextField
                        className="input"
                        name="username"
                        label="E-mail"
                        onChange={this.onChange}
                        error={errors.username}
                        value={username}
                        autoComplete="username"
                    />
                    <TextField
                        className="input"
                        name="password"
                        label="Senha"
                        onChange={this.onChange}
                        value={password}
                        error={errors.password}
                        type="password"
                        autoComplete="password"
                    />
                    <span className="login-error-message">
                        {this.state.errorMessage}
                    </span>
                    <Button
                        className="submitBtn"
                        type="submit"
                        disabled={isLoading}
                    >
                        Entrar
                    </Button>

                    <Button
                        className="submitBtn"
                        type="submit"
                        onClick={() => this.props.goToForgotPass()}
                        disabled={isLoading}
                    >
                        Esqueceu sua senha?
                    </Button>

                    <Button
                        className="submitBtn"
                        type="submit"
                        onClick={() => this.props.goToSignIn()}
                        disabled={isLoading}
                    >
                        Cadastrar
                    </Button>
                </form>
                {/* {show_stringify('Login Form State', this.state, 'login_state')} */}
            </div>
        )
    }
}

export default withRouter(LoginForm);
