import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { getReforms } from '../../services/reforms'
import Typography from '@material-ui/core/Typography'
import toMoneyConversion from 'helpers/toMoneyConversion'
import { editReform } from '../../services/reforms/index'
import { showNotification } from 'components/Notification'
import { Constants } from '../../configs/constants'
import { Search as SearchIcon } from '@material-ui/icons'
import ReformaDetalhe from '../ReformaDetalhe'

const styles = () => ({
    root: {
        width: '100%',
        marginTop: 100,
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    }
})

export default class AreaAdminComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reforms: [],
            openedReformIndex: -1,
            isLoading: true
        }
    }

    async componentDidMount() {
        const reforms = await getReforms()
        this.setState({ reforms, isLoading: false })
    }

    async updateReformStatus(reform, index, value) {
        reform.status = value
        const reforms = this.state.reforms
        reforms[index] = reform
        this.setState({ reforms })

        const response = await editReform(reform)

        if (response.statusCode !== Constants.successCode) {
            showNotification(response.statusDesc, '', 'danger')
        } else {
            showNotification(response.data.message)
        }
    }

    closeDetail = () => {
        this.setState({ openedReformIndex: -1 })
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
                <TableCell component="th" scope="row">
                    {reform.establishmentName}
                </TableCell>
                <TableCell align="right">{reform.author}</TableCell>
                <TableCell align="right">
                    R$ {toMoneyConversion(reform.budgetLimit)}
                </TableCell>
                <TableCell align="right">{reform.establishmentType}</TableCell>
                <TableCell align="right">{reform.phone}</TableCell>
                <TableCell align="right">
                    <Select
                        onChange={(e) =>
                            this.updateReformStatus(
                                reform,
                                index,
                                e.target.value
                            )
                        }
                        style={{ width: '200px' }}
                        labelId="label"
                        id="select"
                        value={reform.status}
                    >
                        <MenuItem value="Orçamento Solicitado">
                            Orçamento Solicitado
                        </MenuItem>
                        <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                        <MenuItem value="Aprovado">Aprovado</MenuItem>
                        <MenuItem value="Parado">Parado</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>
                    <SearchIcon
                        style={{ cursor: 'pointer', color: 'rgb(21,38,32)' }}
                        onClick={() =>
                            this.setState({ openedReformIndex: index })
                        }
                    />
                </TableCell>
            </TableRow>
        )
    }

    render() {
        const { reforms, isLoading, openedReformIndex } = this.state
        const classes = styles()
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        marginLeft: 60,
                        marginBottom: -60,
                        marginTop: 30
                    }}
                >
                    <Typography
                        variant="overline"
                        style={{
                            marginLeft: 30,
                            marginTop: 10,
                            color: 'rgb(255,248,41)',
                            fontSize: 35,
                            fontFamily: 'Playfair Display'
                        }}
                        gutterBottom
                    >
                        Solicitações de Orçamento
                    </Typography>
                </div>
                <Paper className={classes.root} style={{ margin: 60 }}>
                    <Table className={classes.table}>
                        <TableHead
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        >
                            <TableRow>
                                <TableCell align="left">
                                    <b>Nome Estabelecimento</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Nome Usuário</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Orçamento Limite</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Tipo Estabelecimento</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Telefone para Contato</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Status</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Detalhes</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {reforms.length > 0 && (
                            <TableBody>
                                {reforms.map((reform, index) =>
                                    this.renderContent(reform, index)
                                )}
                            </TableBody>
                        )}
                    </Table>
                    {openedReformIndex !== -1 && (
                        <ReformaDetalhe
                            reform={reforms[openedReformIndex]}
                            closeDetail={this.closeDetail}
                            tipoUsuario={0}
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
                                Nenhuma solicitação de orçamento foi encontrada.
                            </h2>
                        </div>
                    )}
                </Paper>
            </div>
        )
    }
}
