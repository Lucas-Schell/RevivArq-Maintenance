import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { Constants } from '../../configs/constants'
import TableRow from '@material-ui/core/TableRow'
import { Edit as EditIcon, Search as SearchIcon } from '@material-ui/icons'
import { showNotification } from 'components/Notification'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { getReforms } from '../../services/reforms'
import { loggedUser } from '../../services/user/index'
import Typography from '@material-ui/core/Typography'
import ReformaDetalhe from '../ReformaDetalhe/index.js'
import toMoneyConversion from 'helpers/toMoneyConversion'
import BlockIcon from '@material-ui/icons/Block'
import { Button } from '@material-ui/core'
import { update } from '../../services/user'
import TextField from '@material-ui/core/TextField'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import Select from '@material-ui/core/Select'

const styles = () => ({
    root: {
        width: '100%',
        marginTop: 100,
        overflowX: 'auto',
        borderRadius: '55px'
    },
    table: {
        minWidth: 650,
        borderBottomRightRadius: '15px',
        border: '15px',
        marginBottom: '15px'
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto'
    }
})

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
            pathname: '/reforma',
            state: {
                reform
            }
        })
    }

    async updateUsers(editUser) {
        return await update(editUser)
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const editUser = {
            _id: this.state.user._id,
            name: this.state.user.name,
            lastName: this.state.user.lastName,
            cpf: this.state.user.cpf,
            cnpj: this.state.user.cnpj,
            civilStatus: this.state.user.civilStatus,
            whatsapp: this.state.user.whatsapp
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
                    <NoteAddIcon
                        style={{ cursor: 'pointer', color: 'rgb(21,38,32)' }}
                        onClick={() => console.log('Teste')}
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

    render() {
        const { reforms, isLoading, user } = this.state
        const classes = styles()

        const formState = 'outlined-disabled'

        return (
            <div style={{ display: 'inline-flex' }}>
                <div style={{ display: 'flex-start ' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: 60,
                            marginBottom: -60,
                            marginTop: 30,
                            marginRight: 50
                        }}
                    >
                        <Typography
                            variant="overline"
                            style={{
                                marginLeft: 30,
                                marginTop: 10,
                                color: 'rgb(255,248,41)',
                                fontSize: 40,
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Perfil
                        </Typography>
                    </div>
                    <Paper
                        className={classes.root}
                        style={{ margin: 60, borderRadius: '15px' }}
                    >
                        <Table
                            className={classes.table}
                            style={{
                                'border-collapse': 'separate',
                                'border-radius': '15px'
                            }}
                        >
                            <TableHead
                                style={{ backgroundColor: 'rgb(255,248,41)' }}
                            >
                                <TableRow>
                                    <TableCell
                                        style={{
                                            borderTopLeftRadius: '15px',
                                            fontSize: '20px'
                                        }}
                                    >
                                        Detalhes do Usuário
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            alignItems: 'center',
                                            borderTopRightRadius: '15px'
                                        }}
                                    >
                                        {this.state.trocaBotao ? (
                                            <Typography>
                                                <TableCell>
                                                    <BlockIcon
                                                        style={{
                                                            fontWeight: 'bold'
                                                        }}
                                                        onClick={(e) =>
                                                            this.trocaBotao(e)
                                                        }
                                                    />
                                                </TableCell>
                                            </Typography>
                                        ) : (
                                            <Typography>
                                                <TableCell>
                                                    <EditIcon
                                                        style={{
                                                            cursor: 'pointer',
                                                            align: 'right',
                                                            marginLeft: 10,
                                                            color:
                                                                'rgb(21,38,32)'
                                                        }}
                                                        onClick={(e) =>
                                                            this.abreEdicao(e)
                                                        }
                                                    />
                                                </TableCell>
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography
                                            style={{ fontSize: '18px' }}
                                        >
                                            Nome:
                                            <br />
                                            <TextField
                                                disabled={
                                                    !this.state.abreEdicao
                                                }
                                                id={formState}
                                                value={this.state.user.name}
                                                onChange={(e) =>
                                                    this.setState({
                                                        user: {
                                                            ...user,
                                                            name: e.target.value
                                                        }
                                                    })
                                                }
                                                className={classes.textField}
                                                margin="normal"
                                                variant="filled"
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography
                                            style={{ fontSize: '18px' }}
                                        >
                                            Sobrenome:
                                            <br />
                                            <TextField
                                                disabled={
                                                    !this.state.abreEdicao
                                                }
                                                id={formState}
                                                value={this.state.user.lastName}
                                                onChange={(e) =>
                                                    this.setState({
                                                        user: {
                                                            ...user,
                                                            lastName:
                                                                e.target.value
                                                        }
                                                    })
                                                }
                                                className={classes.textField}
                                                margin="normal"
                                                variant="filled"
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography
                                            style={{ fontSize: '18px' }}
                                        >
                                            Celular:
                                            <br />
                                            <TextField
                                                disabled={
                                                    !this.state.abreEdicao
                                                }
                                                id={formState}
                                                value={this.state.user.whatsapp}
                                                onChange={(e) =>
                                                    this.setState({
                                                        user: {
                                                            ...user,
                                                            whatsapp:
                                                                e.target.value
                                                        }
                                                    })
                                                }
                                                className={classes.textField}
                                                margin="normal"
                                                variant="filled"
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography
                                            style={{ fontSize: '18px' }}
                                        >
                                            CPF:
                                            <br />
                                            <TextField
                                                disabled={
                                                    !this.state.abreEdicao
                                                }
                                                id={formState}
                                                value={this.state.user.cpf}
                                                className={classes.textField}
                                                onChange={(e) =>
                                                    this.setState({
                                                        user: {
                                                            ...user,
                                                            cpf: e.target.value
                                                        }
                                                    })
                                                }
                                                margin="normal"
                                                variant="filled"
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography
                                            style={{ fontSize: '18px' }}
                                        >
                                            CNPJ:
                                            <br />
                                            <TextField
                                                disabled={
                                                    !this.state.abreEdicao
                                                }
                                                id={formState}
                                                value={this.state.user.cnpj}
                                                className={classes.textField}
                                                onChange={(e) =>
                                                    this.setState({
                                                        user: {
                                                            ...user,
                                                            cnpj: e.target.value
                                                        }
                                                    })
                                                }
                                                margin="normal"
                                                variant="filled"
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        className="table-row"
                                        align="left"
                                    >
                                        <Typography
                                            style={{
                                                marginTop: '2px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            Estado Civil:
                                            <br />
                                            <br />
                                            <Select
                                                disabled={
                                                    !this.state.abreEdicao
                                                }
                                                onChange={(e) =>
                                                    this.setState({
                                                        user: {
                                                            ...user,
                                                            civilStatus:
                                                                e.target.value
                                                        }
                                                    })
                                                }
                                                labelId="label"
                                                id="select"
                                                style={{ width: '200px' }}
                                                value={
                                                    this.state.user
                                                        .civilStatus || ''
                                                }
                                            >
                                                <MenuItem value="Solteiro(a)">
                                                    Solteiro(a)
                                                </MenuItem>
                                                <MenuItem value="Casado(a)">
                                                    Casado(a)
                                                </MenuItem>
                                                <MenuItem value="Divorciado(a)">
                                                    Divorciado(a)
                                                </MenuItem>
                                                <MenuItem value="Viúvo(a)">
                                                    Viúvo(a)
                                                </MenuItem>
                                                <MenuItem value="Separado(a)">
                                                    Separado(a)
                                                </MenuItem>
                                            </Select>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            borderBottomLeftRadius: '15px'
                                        }}
                                    >
                                        {this.state.abreEdicao ? (
                                            <Button
                                                type="submit"
                                                style={{
                                                    color: 'white',
                                                    backgroundColor:
                                                        'rgb(21,38,32)'
                                                }}
                                                onClick={this.handleSubmit}
                                            >
                                                Atualizar Dados
                                            </Button>
                                        ) : (
                                            <div />
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                <div
                    style={{
                        display: 'block',
                        marginLeft: 0,
                        marginBottom: -0,
                        marginTop: 0
                    }}
                >
                    <div>
                        <Typography
                            variant="overline"
                            style={{
                                marginTop: 40,
                                color: 'rgb(255,248,41)',
                                fontSize: 40,
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            Solicitações de Orçamento
                        </Typography>
                    </div>
                    <div className={classes.tableWrapper}>
                        <Paper
                            className={classes.root}
                            style={{ margin: 10, borderRadius: '15px' }}
                        >
                            <Table
                                className={classes.table}
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
                    </div>
                </div>
            </div>
        )
    }
}
