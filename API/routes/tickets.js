const express = require('express')
const TicketController = require('../Controllers/TicketController')

const routerTickets = express.Router()

//Add Routes
routerTickets.post('/', (req, res) => {
    if (req.body.name && req.body.email && req.body.message) {
        TicketController.createEmail(req)
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})
module.exports = routerTickets
