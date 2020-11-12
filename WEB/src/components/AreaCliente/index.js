import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { Constants } from '../../configs/constants'
import TableRow from '@material-ui/core/TableRow'
import { Edit as EditIcon, Search as SearchIcon } from '@material-ui/icons'
import { showNotification } from 'components/Notification'
import Paper from '@material-ui/core/Paper'
import { getReforms, editReform } from '../../services/reforms'
import { loggedUser } from '../../services/user/index'
import Typography from '@material-ui/core/Typography'
import ReformaDetalhe from '../ReformaDetalhe/index.js'
import toMoneyConversion from 'helpers/toMoneyConversion'
import { update } from '../../services/user'
import ChatModal from '../ChatModal'
import SolicitationModal from '../SolicitationModal/index.js'
import Grid from '@material-ui/core/Grid'

export default class SwitchListSecondary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reforms: [],
            user: {},
            irDash: false,
            openedReformIndex: -1,
            isLoading: true,
            abreEdicao: false
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        const reforms = await getReforms()
        console.log(reforms)
        this.setState({ reforms, isLoading: false })

        const user = await loggedUser()
        this.setState({ user, isLoading: false })
        //const user = await read()
    }

    handleClick(reform) {
        this.setState({
            irDash: true,
            reforma: reform
        })
        this.props.history.push({
            pathname: '/FacaPedido',
            state: {
                reform,
                title: 'Editar Orçamento'
            }
        })
    }

    async updateUsers(editUser) {
        return await update(editUser)
    }

    async handleSubmit() {
        const editUser = {
            _id: this.state.user._id,
            name: this.state.user.name,
            lastName: this.state.user.lastName,
            cpf: this.state.user.cpf,
            cnpj: this.state.user.cnpj,
            civilStatus: this.state.user.civilStatus,
            whatsapp: this.state.user.whatsapp,
            chat: []
        }

        const updateUser = await this.updateUsers(editUser)
        if (updateUser.statusCode !== Constants.successCode) {
            showNotification(updateUser.statusDesc, '', 'danger')
            return false
        } else {
            showNotification(updateUser.data.message)
            return true
        }
    }

    renderContent(reform, index) {
        if (
            this.state.openedReformIndex === -1 ||
            this.state.openedReformIndex === index
        )
            return this.renderRow(reform, index)
    }

    async sendMessage(reform) {
        await editReform(reform)
    }

    getChat() {}

    renderRow(reform, index) {
        return (
            <TableRow key={reform.id}>
                <TableCell
                    component="th"
                    style={{ borderBottomLeftRadius: '15px' }}
                    scope="row"
                >
                    {reform.establishmentName}
                </TableCell>
                <TableCell align="right">
                    R$ {toMoneyConversion(reform.budgetLimit)}
                </TableCell>
                <TableCell align="right">{reform.establishmentType}</TableCell>
                <TableCell align="right">{reform.status}</TableCell>
                <TableCell align="right">
                    <SearchIcon
                        style={{ cursor: 'pointer', color: 'rgb(21,38,32)' }}
                        onClick={() =>
                            this.setState({ openedReformIndex: index })
                        }
                    />
                </TableCell>
                <TableCell align="right">
                    <EditIcon
                        style={{ cursor: 'pointer', color: 'rgb(21,38,32)' }}
                        onClick={() => this.handleClick(reform)}
                    />
                </TableCell>
                <TableCell
                    align="right"
                    style={{ borderBottomRightRadius: '15px' }}
                >
                    <ChatModal
                        id={reform.id}
                        onSubmit={this.sendMessage}
                        updateChat={this.getChat}
                        chat={this.state.chat}
                    />
                </TableCell>
            </TableRow>
        )
    }

    handleClickvoltar() {
        this.setState({
            irDash: false
        })
    }

    trocaBotao() {
        const estado = this.state.trocaBotao
        if (estado) {
            this.setState({
                trocaBotao: false,
                abreEdicao: false,
                disabled: false
            })
        } else {
            this.setState({
                trocaBotao: true,
                abreEdicao: true,
                disabled: true
            })
        }
    }

    abreEdicao() {
        const estado = this.state.disabled
        if (estado) {
            this.setState({
                abreEdicao: false,
                trocaBotao: false
            })
        } else {
            this.setState({
                abreEdicao: true,
                trocaBotao: true
            })
        }
    }

    closeDetail = () => {
        this.setState({ openedReformIndex: -1 })
    }

    onChange(e) {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        const { reforms, isLoading } = this.state

        return (
            <Grid container xs={12} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <SolicitationModal
                        onChange={this.onChange}
                        handleSubmit={this.handleSubmit}
                        user={this.state.user}
                    />
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            variant="overline"
                            style={{
                                marginTop: 40,
                                color: 'rgb(255,248,41)',
                                fontSize: 25,
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            Solicitações de Orçamento
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={12}
                        style={{
                            justifyContent: 'center',
                            maxWidth: '90vw',
                            overflow: 'auto'
                        }}
                    >
                        <Paper
                            style={{
                                borderRadius: '15px',
                                maxWidth: '100%',
                                overflow: 'auto'
                            }}
                        >
                            <Table
                                style={{
                                    'border-collapse': 'separate',
                                    'border-radius': '15px'
                                }}
                            >
                                <TableHead
                                    style={{
                                        backgroundColor: 'rgb(255,248,41)'
                                    }}
                                >
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                fontSize: 15,
                                                borderTopLeftRadius: '15px'
                                            }}
                                            className="table-row"
                                        >
                                            <b>Nome Estabelecimento</b>
                                        </TableCell>
                                        <TableCell
                                            style={{ fontSize: 15 }}
                                            align="left"
                                        >
                                            <b>Orçamento Limite</b>
                                        </TableCell>{' '}
                                        {/* estava Nome Solicitação, troquei para orçamento limite pois n entendi qual campo era esse e n tem nenhum parecido que volte nessa chamada */}
                                        <TableCell
                                            style={{ fontSize: 15 }}
                                            align="left"
                                        >
                                            <b>Tipo do Estabelicimento</b>
                                        </TableCell>
                                        <TableCell
                                            style={{ fontSize: 15 }}
                                            align="left"
                                        >
                                            <b>Status</b>
                                        </TableCell>
                                        <TableCell
                                            style={{ fontSize: 15 }}
                                            align="left"
                                        >
                                            <b />
                                        </TableCell>
                                        <TableCell
                                            style={{ fontSize: 15 }}
                                            align="left"
                                        >
                                            <b />
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 15,
                                                borderTopRightRadius: '15px'
                                            }}
                                            align="left"
                                        >
                                            <b />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.reforms.map((reform, index) =>
                                        this.renderContent(reform, index)
                                    )}
                                </TableBody>
                            </Table>
                            {this.state.openedReformIndex !== -1 && (
                                <ReformaDetalhe
                                    reform={
                                        this.state.reforms[
                                            this.state.openedReformIndex
                                        ]
                                    }
                                    closeDetail={this.closeDetail}
                                    tipoUsuario={1}
                                />
                            )}
                            {!isLoading && reforms.length === 0 && (
                                <div
                                    style={{
                                        minHeight: '100px',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <h2 style={{ textAlign: 'center' }}>
                                        Você não possui nenhuma solicitação
                                        efetuada.
                                    </h2>
                                </div>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
