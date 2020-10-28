import React from 'react'
import Page from '../Page'
import TicketForm from '../../components/Forms/TicketForm'

class TicketPage extends Page {
    authenticated = () => {
        return this.unauthenticated()
    }
    unauthenticated = () => {
        console.log('os cara pega o bagulho pronto e acham que tao abalando')
        const { classes } = this.props

        return <TicketForm classes={classes} />
    }
}

export default TicketPage
