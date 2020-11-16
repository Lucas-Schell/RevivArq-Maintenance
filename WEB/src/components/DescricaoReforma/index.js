import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { getReforms } from '../../services/reforms'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

const styles = () => ({
    root: {
        width: '100%',
        marginTop: 100,
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
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
            reforms: []
        }
    }

    async componentDidMount() {
        const reforms = await getReforms()
        //console.log(reforms.photos)
        //const photos = await getPhotos()
        //console.log('getPhotos',photos)
        //const reform = await getReformById('5d92891f916da312a457a0f1')
        this.setState({ reforms })
        //console.log("reformas: ", reforms);
    }

    handleClick(reform) {
        //console.log('this is:', getReformById(reform.id));
    }

    render() {
        const classes = styles()
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        marginLeft: 0,
                        marginBottom: -60,
                        marginTop: 30
                    }}
                >
                    <Typography
                        variant="overline"
                        style={{
                            marginLeft: 30,
                            marginTop: 10,
                            color: '#fff829',
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
                        <TableHead style={{ backgroundColor: '#fff829' }}>
                            <TableRow>
                                <TableCell>ID #</TableCell>
                                <TableCell align="left">
                                    <b>Nome Usuário</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Orçamento Limite</b>
                                </TableCell>{' '}
                                {/* estava Nome Solicitação, troquei para orçamento limite pois n entendi qual campo era esse e n tem nenhum parecido que volte nessa chamada */}
                                <TableCell align="left">
                                    <b>Tipo do Estabelicimento </b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Status</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Visualizar</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.reforms.map((reform, index) => (
                                <TableRow key={reform.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">
                                        Usuário {index}
                                    </TableCell>{' '}
                                    {/*Nome do usuário n volta na chamada de get reformas, vou ter que fazer um "join" ou salvar o nome junto ao criar a reforma, por enquanto deixamos mockado e vemos na próxima sprint */}
                                    <TableCell align="right">
                                        {reform.budgetLimit}
                                    </TableCell>
                                    <TableCell align="right">
                                        {reform.establishmentName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {reform.status}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            endIcon={<Icon>send</Icon>}
                                            onClick={() =>
                                                this.handleClick(reform)
                                            }
                                        />{' '}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}
