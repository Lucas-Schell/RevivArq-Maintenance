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
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    container: {
        alignItems: 'center',
        alignContent: 'space-between'
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
        return (
            <Grid container style={{ alignContent: 'space-between' }}>
                <Grid item xs={12}>
                    <Typography>FORM</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input />
                </Grid>
                <Grid item xs={12}>
                    <Input />
                </Grid>
                <Grid item xs={12}>
                    <Input />
                </Grid>
                <Grid item xs={12}>
                    <Input />
                </Grid>
                <Grid item xs={12}>
                    <Button>Teste</Button>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TicketPage)
