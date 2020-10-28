import React from 'react'
import Page from '../Page'
import TicketForm from '../../components/Forms/TicketForm'

class TicketPage extends Page {
    authenticated = () => {
        return this.unauthenticated()
    }
    unauthenticated = () => {
        console.log('max burro')
        const { classes } = this.props

        return <TicketForm classes={classes} />
    }
}

export default TicketPage
