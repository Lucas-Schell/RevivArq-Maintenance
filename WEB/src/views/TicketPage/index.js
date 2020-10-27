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
        minHeight: '500px',
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
        backgroundColor: '#FFF829'
    },

    gridwrapper: { width: '100%' }
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
            <Grid container className={classes.container} xs={6}>
                <Grid item xs={12} className={classes.containerTitle}>
                    <Typography className={classes.titleText}>
                        Mande a sua dúvida com o ticket abaixo
                    </Typography>
                </Grid>

                {/*<Grid item xs={12}>
                    <Input className={classes.textField} />
                </Grid>
                <Grid item xs={12}>
                    <Input className={classes.textField} />
                </Grid>
                <Grid item xs={12}>
                    <Input className={classes.textField} />
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.textField}>Send</Button>
                </Grid>*/}
            </Grid>
        )
    }
}

export default withStyles(styles)(TicketPage)
