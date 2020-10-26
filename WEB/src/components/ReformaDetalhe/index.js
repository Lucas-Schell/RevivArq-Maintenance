import React from 'react'
import './styles.css'
import {
    ExpandLess as ExpandLessIcon,
    Search as SearchIcon
} from '@material-ui/icons'
import TextField from '@material-ui/core/TextField'
import AttachMoney from '@material-ui/icons/AttachMoney'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import FlagRoundedIcon from '@material-ui/icons/FlagRounded'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import WhatsApp from '@material-ui/icons/Call'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Divider from '@material-ui/core/Divider'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BlockIcon from '@material-ui/icons/Block'
import BuildIcon from '@material-ui/icons/Build'
import toMoneyConversion from 'helpers/NumberUtility'
import Gallery from 'react-grid-gallery'
import Modal from '../Modal/index'
import { getUser, loggedUser } from '../../services/user'

const getTypes = (itens) => {
    let tipos = ''
    if (itens.forro) {
        tipos += ' Forro'
    }
    if (itens.fachada) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Fachada'
    }
    if (itens.paisagismo) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Paisagismo'
    }
    if (itens.iluminacao) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Iluminacao'
    }
    if (itens.projetoImobiliario) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Projeto Imobiliario'
    }
    if (itens.projetoHidraulico) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Projeto Hidraulico'
    }
    if (itens.necessidadeDemolir) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Demolir'
    }
    if (itens.necessidadeConstruir) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Construir'
    }
    if (itens.paredesERevestimentos) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Parede e Revestimento'
    }
    if (itens.identidadeEComunicação) {
        if (tipos.length > 0) {
            tipos += ','
        }
        tipos += ' Identidade e Comunicação'
    }
    if (itens.outros.length > 0) {
        if (tipos.length > 0) {
            tipos += ', '
        }
        tipos += itens.outros
    }
    return tipos
}

export default class ReformaDetalhe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpened: false,
            user: {},
            IMAGES: []
        }
    }

    //async componentDidMount() {
    //const photo = await getPhoto()
    //this.setState({ photo })
    //}

    async componentWillMount() {
        const IMAGES = []
        for (let i = 0; i < this.props.reform.photos.length; i++) {
            IMAGES.push({
                src:
                    'http://localhost:4000/api/photos/image?file=' +
                    this.props.reform.photos[i],
                thumbnail:
                    'http://localhost:4000/api/photos/image?file=' +
                    this.props.reform.photos[i],
                thumbnailWidth: 320,
                thumbnailHeight: 212
            })
        }
        this.setState({ IMAGES })
    }

    componentDidMount() {
        this.getUsuario()
    }

    getUsuario = async () => {
        let user
        if (this.props.tipoUsuario === 1) {
            user = await loggedUser()
            this.setState({
                user
            })
        } else {
            user = await getUser(this.props.reform.userId)
            this.setState({
                user
            })
        }
    }

    renderModalContent() {
        return (
            <Grid>
                <h3 style={{ textAlign: 'center' }}>
                    {' '}
                    Detalhes do Solicitante
                </h3>
                <Typography>
                    Nome
                    <br />
                    <TextField disabled={true} value={this.state.user.name} />
                </Typography>
                <Typography>
                    Sobrenome
                    <br />
                    <TextField
                        disabled={true}
                        value={this.state.user.lastName}
                    />
                </Typography>
                <Typography>
                    E-mail
                    <br />
                    <TextField disabled={true} value={this.state.user.email} />
                </Typography>
                <Typography>
                    Telefone/WhatsApp
                    <br />
                    <TextField
                        disabled={true}
                        value={this.state.user.whatsapp}
                    />
                </Typography>
                <Typography>
                    CPF
                    <br />
                    <TextField disabled={true} value={this.state.user.cpf} />
                </Typography>
                <Typography>
                    CNPJ
                    <br />
                    <TextField disabled={true} value={this.state.user.cnpj} />
                </Typography>
                <Typography>
                    Estado Civil
                    <br />
                    <TextField
                        disabled={true}
                        value={this.state.user.civilStatus}
                    />
                </Typography>
            </Grid>
        )
    }

    render() {
        const { reform } = this.props
        return (
            <div
                className="reforma-detalhe-main-container"
                style={{ borderRadius: '15px' }}
            >
                <header className="reforma-detalhe-header">
                    <h3>Detalhes - {this.props.reform.establishmentName}</h3>
                    <ExpandLessIcon
                        style={{ cursor: 'pointer', color: 'rgb(21,38,32)' }}
                        onClick={() => this.props.closeDetail()}
                    />
                </header>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} style={{ objectFit: 'cover' }}>
                            <Gallery
                                images={this.state.IMAGES}
                                style={{
                                    cursor: 'pointer',
                                    color: 'rgb(21,38,32)'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18
                                }}
                            >
                                <BuildIcon
                                    style={{ marginRight: 10, marginTOp: 7 }}
                                />
                                <b>Itens de Reforma:</b>&nbsp;
                                {getTypes(reform.reformItens)}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <AttachMoney style={{ marginRight: 10 }} />
                                <b>Orçamento:</b>&nbsp; R${' '}
                                {toMoneyConversion(
                                    this.props.reform.budgetLimit
                                )}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <ZoomOutMapIcon style={{ marginRight: 10 }} />
                                <b>Área:</b>&nbsp; {this.props.reform.area} m²
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <FlagRoundedIcon style={{ marginRight: 10 }} />
                                <b>Objetivo:</b>&nbsp; {this.props.reform.goal}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <LocationOnIcon style={{ marginRight: 10 }} />
                                <b>Endereço:</b>&nbsp;
                                {this.props.reform.address.street},{' '}
                                {this.props.reform.address.number},{' '}
                                {this.props.reform.address.complement} -{' '}
                                {this.props.reform.address.neighborhood}.{' '}
                                {this.props.reform.address.city} -{' '}
                                {this.props.reform.address.uf}.{' '}
                                {this.props.reform.address.cep}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <AccountCircleIcon
                                    style={{ marginRight: 10 }}
                                />{' '}
                                <b>Solicitante:</b>&nbsp;
                                {this.props.reform.author}{' '}
                                <SearchIcon
                                    style={{
                                        marginLeft: '2px',
                                        cursor: 'pointer',
                                        color: 'rgb(21,38,32)'
                                    }}
                                    onClick={() =>
                                        this.setState({ modalOpened: true })
                                    }
                                />
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <WhatsApp style={{ marginRight: 10 }} />{' '}
                                <b>Contato:</b>&nbsp;
                                {this.props.reform.phone}{' '}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginTop: '20px'
                                }}
                            >
                                <BlockIcon style={{ marginRight: 10 }} />{' '}
                                <b>Restrições:</b>
                                &nbsp; {this.props.reform.restrictions}{' '}
                            </Typography>
                            <Divider />
                        </Grid>
                    </Grid>
                </div>
                <Modal
                    open={this.state.modalOpened}
                    callBackClose={() => this.setState({ modalOpened: false })}
                >
                    {this.renderModalContent()}
                </Modal>
            </div>
        )
    }
}
