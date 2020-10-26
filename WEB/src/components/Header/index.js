import React from 'react'
import logo from './logo2.png'
import './styles.css'
import { withRouter } from 'react-router-dom'
import { logout, validToken } from 'services/auth'
import Button from '@material-ui/core/Button'
import Modal from '../Modal/index'
import LoginForm from 'components/Forms/LoginForm'
import CadastroUsuario from 'components/Forms/CadastroUsuario'
import Email from 'views/Email'
import RecPassword from 'views/RecPassword'
import { showNotification } from 'components/Notification'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.modalScreen = {
            login: 0,
            register: 1,
            email: 2,
            recpass: 3
        }
        this.state = {
            display: null,
            render: null,
            modalOpened: false,
            modalState: 0,
            isAdmin: 'false',
            userName: null,
            botaoSair: null,
            goToNewRequest: false,
            recEmail: ''
        }
    }

    componentWillReceiveProps(props, undefined) {
        const { display } = this.props
        if (props.display !== display) {
            this.setState({ display: props.display })
        }
    }

    componentDidMount() {
        this.validAdmin()
    }

    validAdmin() {
        const admin = sessionStorage.getItem('isAdmin')
        this.setState({
            isAdmin: admin
        })
    }

    componentWillMount() {
        this.renderHeaderButtons()
    }

    redirect = (path) => {
        const { history } = this.props
        history.push(path)
    }

    renderUserName = () => {
        return (
            <Button
                style={{
                    float: 'right',
                    fontFamily: 'Playfair Display',
                    padding: 10
                }}
                id="logoutBtn"
                className="btn"
                onClick={() => {
                    this.redirect('/AreaCliente')
                }}
            >
                Olá, {sessionStorage.getItem('user')}!
            </Button>
        )
    }

    renderLogout = () => {
        return (
            <Button
                style={{
                    float: 'right',
                    fontFamily: 'Playfair Display',
                    padding: 10
                }}
                id="logoutBtn"
                className="btn"
                onClick={() => this.doLogout()}
            >
                S A I R
            </Button>
        )
    }

    doLogout = async () => {
        await logout()
        this.setState({ botaoSair: null, isAdmin: 'false', userName: null })
        await this.renderHeaderButtons()
        showNotification('Desconectado com sucesso!')
        const { history } = this.props
        if (history !== '/') this.redirect('/')
    }

    renderLogin = () => {
        return (
            <Button
                style={{ fontFamily: 'Playfair Display' }}
                id="loginBtn"
                className="loginbtn"
                onClick={() => {
                    this.setState({ modalOpened: true })
                }}
            >
                E N T R A R
            </Button>
        )
    }

    renderHeaderButtons = async () => {
        try {
            const isAuthenticated = await validToken()
            await this.validAdmin()
            const admin = this.state.isAdmin

            if (!isAuthenticated) {
                await this.setState({ render: this.renderLogin() })
            } else {
                if (admin === 'false') {
                    await this.setState({ render: this.renderUserArea() })
                    await this.setState({ userName: this.renderUserName() })
                    await this.setState({ botaoSair: this.renderLogout() })
                } else if (admin === 'true') {
                    await this.setState({ render: this.renderAdmin() })
                    await this.setState({ botaoSair: this.renderLogout() })
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    renderAdmin = () => {
        return (
            <Button
                style={{ fontFamily: 'Playfair Display' }}
                id="botaoAdmin"
                className="btn"
                onClick={() => {
                    this.redirect('/AreaAdmin')
                }}
            >
                Área Admin
            </Button>
        )
    }

    renderUserArea = () => {
        return (
            <Button
                style={{ fontFamily: 'Playfair Display' }}
                id="botaoCliente"
                className="btn"
                onClick={() => {
                    this.redirect('/AreaCliente')
                }}
            >
                Área Cliente
            </Button>
        )
    }

    renderModalContent() {
        if (this.state.modalState === this.modalScreen.login)
            return (
                <LoginForm
                    goToNewRequest={this.state.goToNewRequest}
                    refreshHeader={() => this.renderHeaderButtons()}
                    closeModal={() =>
                        this.setState({
                            modalOpened: false,
                            goToNewRequest: false
                        })
                    }
                    goToForgotPass={() =>
                        this.setState({ modalState: this.modalScreen.email })
                    }
                    goToSignIn={() =>
                        this.setState({ modalState: this.modalScreen.register })
                    }
                />
            )
        if (this.state.modalState === this.modalScreen.register)
            return (
                <CadastroUsuario
                    goToNewRequest={this.state.goToNewRequest}
                    refreshHeader={() => this.renderHeaderButtons()}
                    closeModal={() =>
                        this.setState({
                            modalOpened: false,
                            goToNewRequest: false
                        })
                    }
                    backToLogin={() =>
                        this.setState({ modalState: this.modalScreen.login })
                    }
                />
            )
        if (this.state.modalState === this.modalScreen.email)
            return (
                <Email
                    setRecEmail={(email) => this.setState({ recEmail: email })}
                    closeModal={() => this.setState({ modalOpened: false })}
                    goToRecPass={() =>
                        this.setState({ modalState: this.modalScreen.recpass })
                    }
                    backToLogin={() =>
                        this.setState({ modalState: this.modalScreen.login })
                    }
                />
            )
        if (this.state.modalState === this.modalScreen.recpass)
            return (
                <RecPassword
                    email={this.state.recEmail}
                    closeModal={() => this.setState({ modalOpened: false })}
                    backToLogin={() =>
                        this.setState({ modalState: this.modalScreen.login })
                    }
                />
            )
        return null
    }

    redirectFacaPedido = async () => {
        const isAuthenticated = await validToken()

        if (isAuthenticated) this.redirect('/FacaPedido')
        else {
            this.setState({
                modalState: this.modalScreen.login,
                modalOpened: true,
                goToNewRequest: true
            })
            showNotification(
                'Para poder solicitar um orçamento primeiro realize seu login no RevivArq',
                '',
                'warning'
            )
        }
    }

    render() {
        const { display } = this.props
        const { render, modalOpened, botaoSair, userName, isAdmin } = this.state

        if (display) {
            return (
                <header className="App-header" style={{ flex: 1 }}>
                    <img
                        src={logo}
                        className="App-logo"
                        alt="logo"
                        onClick={() => {
                            this.redirect('/')
                        }}
                    />

                    <Button
                        style={{ fontFamily: 'Playfair Display' }}
                        id="botaoAbout"
                        className="btn"
                        onClick={() => {
                            this.redirect('/')
                        }}
                    >
                        Início
                    </Button>

                    <Button
                        style={{ fontFamily: 'Playfair Display' }}
                        id="botaoTicket"
                        className="btn"
                        onClick={() => {
                            this.redirect('/ticket')
                        }}
                    >
                        Envie um ticket
                    </Button>

                    {(!isAdmin || isAdmin === 'false') && (
                        <Button
                            style={{ fontFamily: 'Playfair Display' }}
                            id="botaoEquipe"
                            className="btn"
                            onClick={this.redirectFacaPedido}
                        >
                            Faça um Orçamento
                        </Button>
                    )}

                    {render}

                    {botaoSair}

                    {userName}

                    <Modal
                        open={modalOpened}
                        callBackClose={() =>
                            this.setState({
                                modalOpened: false,
                                goToNewRequest: false,
                                modalState: this.modalScreen.login
                            })
                        }
                        resetCallback={() =>
                            this.setState({
                                modalState: this.modalScreen.login,
                                goToNewRequest: false
                            })
                        }
                    >
                        {this.renderModalContent()}
                    </Modal>
                </header>
            )
        } else {
            return <div />
        }
    }
}

export default withRouter(Header)
