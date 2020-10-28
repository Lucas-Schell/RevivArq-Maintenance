import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import { Constants } from '../../../configs/constants'
import { showNotification } from '../../Notification'
import { postTicket } from '../../../services/ticket'

const styles = (theme) => ({
    container: {
        minHeight: '800px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 50,
        color: '#000000'
    },
    containerTitle: {
        backgroundColor: '#FFF829'
    },
    textField: {
        backgroundColor: '#f5f5f5'
    },
    button: {
        width: '80%',
        color: 'white',
        backgroundColor: '#152620',
        '&:hover': {
            opacity: 0.9,
            backgroundColor: '#152620'
        }
    }
})

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            name: '',
            email: '',
            message: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async onSubmit() {
        const ticket = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }
        const registerAttempt = await postTicket(ticket)
        if (registerAttempt.statusCode !== Constants.Created) {
            showNotification(
                'Sua mensagem não foi enviada, tente novamente mais tarde.',
                'Erro',
                'danger'
            )
        } else {
            showNotification('Sua mensagem foi enviada.', 'Sucesso!')
        }
    }

    render() {
        const { name, email, message } = this.state
        const { classes } = this.props

        return (
            <Grid container xs={12} className={classes.container}>
                <Grid
                    container
                    item
                    xs={6}
                    spacing={8}
                    className={classes.containerTitle}
                >
                    <Grid item xs={12}>
                        <Typography className={classes.titleText}>
                            ENVIE SEU TICKET
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            variant="outlined"
                            name="name"
                            label="Nome"
                            value={name}
                            onChange={this.onChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            variant="outlined"
                            name="email"
                            label="E-Mail"
                            value={email}
                            onChange={this.onChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            label="Ticket"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="message"
                            value={message}
                            onChange={this.onChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={this.onSubmit}
                            className={classes.button}
                            variant="contained"
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TicketForm)
