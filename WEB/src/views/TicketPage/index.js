import React from 'react'
import {
    Button,
    Grid,
    Hidden,
    Input,
    makeStyles,
    Typography,
    useMediaQuery
} from '@material-ui/core'
import Page from '../Page'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

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
        width: 500,
        color: 'white',
        backgroundColor: '#152620',
        '&:hover': {
            opacity: 0.9,
            backgroundColor: '#152620'
        }
    }
})

class TicketPage extends Page {
    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }

    authenticated = () => {
        return this.unauthenticated()
    }
    unauthenticated = () => {
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
                            label="Nome"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            variant="outlined"
                            label="E-Mail"
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
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button className={classes.button} variant="contained">
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TicketPage)
