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
import Grid from '@material-ui/core/Grid'

//Icons
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import BuildIcon from '@material-ui/icons/Build'
import PostAddIcon from '@material-ui/icons/PostAdd'

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

    componentWillReceiveProps(props, next) {
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
                onClick={() => {
                    this.redirect('/AreaCliente')
                }}
            >
                Olá, {sessionStorage.getItem('user')}!
            </Button>
        )
    }

    renderLogout = (mobile) => {
        if (mobile) {
            return (
                <IconButton onClick={() => this.doLogout()}>
                    <ExitToAppIcon />
                </IconButton>
            )
        }
        return <Button onClick={() => this.doLogout()}>Sair</Button>
    }

    doLogout = async () => {
        await logout()
        this.setState({ botaoSair: null, isAdmin: 'false', userName: null })
        await this.renderHeaderButtons()
        showNotification('Desconectado com sucesso!')
        const { history } = this.props
        if (history !== '/') this.redirect('/')
    }

    renderLogin = (mobile) => {
        if (mobile) {
            return (
                <IconButton
                    onClick={() => {
                        this.setState({ modalOpened: true })
                    }}
                >
                    <PersonIcon />
                </IconButton>
            )
        }

        return (
            <Button onClick={() => this.setState({ modalOpened: true })}>
                Entrar
            </Button>
        )
    }

    renderHeaderButtons = async () => {
        try {
            const isAuthenticated = await validToken()
            this.validAdmin()
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

    renderAdmin = (mobile) => {
        if (mobile) {
            return (
                <IconButton
                    onClick={() => {
                        this.redirect('/AreaAdmin')
                    }}
                >
                    <BuildIcon />
                </IconButton>
            )
        }
        return (
            <Button
                onClick={() => {
                    this.redirect('/AreaAdmin')
                }}
            >
                Área Admin
            </Button>
        )
    }

    renderUserArea = (mobile) => {
        if (mobile) {
            return (
                <IconButton
                    onClick={() => {
                        this.redirect('/AreaCliente')
                    }}
                >
                    <PersonIcon />
                </IconButton>
            )
        }
        return (
            <Button
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
                <div style={{ width: '100%' }}>
                    <div class="mobile">
                        <Grid
                            container
                            className={'App-header-container'}
                            xs={12}
                        >
                            <Grid item xs={12}>
                                <img
                                    src={logo}
                                    className="App-logo"
                                    alt="logo"
                                    onClick={() => {
                                        this.redirect('/')
                                    }}
                                />
                            </Grid>

                            <Grid
                                container
                                item
                                xs={12}
                                className={'App-header-container-center'}
                            >
                                <Grid item>
                                    <IconButton
                                        onClick={() => {
                                            this.redirect('/ticket')
                                        }}
                                    >
                                        <HelpIcon />
                                    </IconButton>
                                </Grid>
                                {(!isAdmin || isAdmin === 'false') && (
                                    <Grid item>
                                        <IconButton
                                            onClick={this.redirectFacaPedido}
                                        >
                                            <PostAddIcon />
                                        </IconButton>
                                    </Grid>
                                )}

                                <Grid item>
                                    <Grid item>
                                        {botaoSair !== null
                                            ? isAdmin === 'true'
                                                ? this.renderAdmin(true)
                                                : this.renderUserArea(true)
                                            : this.renderLogin(true)}
                                    </Grid>
                                </Grid>
                                {botaoSair !== null && (
                                    <Grid item>{this.renderLogout(true)}</Grid>
                                )}
                            </Grid>

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
                        </Grid>
                    </div>
                    <div className="desktop">
                        <Grid
                            container
                            className={'App-header-container'}
                            xs={12}
                        >
                            <Grid item xs={window.screen.width > 1000 ? 3 : 12}>
                                <img
                                    src={logo}
                                    className="App-logo"
                                    alt="logo"
                                    onClick={() => {
                                        this.redirect('/')
                                    }}
                                />
                            </Grid>

                            <Grid
                                container
                                item
                                xs={window.screen.width > 1000 ? 6 : 12}
                                className={'App-header-container-center'}
                            >
                                <Grid item>
                                    <Button
                                        onClick={() => {
                                            this.redirect('/ticket')
                                        }}
                                    >
                                        Envie um ticket
                                    </Button>
                                </Grid>

                                {(!isAdmin || isAdmin === 'false') && (
                                    <Grid item>
                                        <Button
                                            onClick={this.redirectFacaPedido}
                                        >
                                            Faça um Orçamento
                                        </Button>
                                    </Grid>
                                )}

                                <Grid item>{render}</Grid>
                            </Grid>

                            <Grid
                                container
                                item
                                xs={window.screen.width > 1000 ? 3 : 12}
                                className={'App-header-container-right'}
                            >
                                <Grid item>{userName}</Grid>

                                {botaoSair !== null && (
                                    <Grid item>{botaoSair}</Grid>
                                )}
                            </Grid>

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
                        </Grid>
                    </div>
                </div>
            )
        } else {
            return <div />
        }
    }
}

export default withRouter(Header)
