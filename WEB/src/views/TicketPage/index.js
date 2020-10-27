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
import theme from '../../styles/customMuiTheme'
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
        width: 700,
        backgroundColor: '#FFF829',
        textAlign: 'center'
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
                    spacing={40}
                    className={classes.containerTitle}
                >
                    <Grid item xs={12}>
                        <Typography className={classes.titleText}>
                            ENVIE SEU TICKET
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Input fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Input fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Input fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button fullWidth>Send</Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TicketPage)
