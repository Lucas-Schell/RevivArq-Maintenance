const express = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const ReformController = require('../Controllers/ReformController')

const routerReform = express.Router()

//All reforms
routerReform.get('/', (req, res) => {
    ReformController.fetchReforms(req.User, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, false))
    })
})

//update reforms
routerReform.put('/', (req, res) => {
    ReformController.updateReform(req.body, req.User, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, null, true))
    })
})

//Find Routes
routerReform.get('/:id', (req, res) => {
    ReformController.findReform(req.params.id, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

//Add Routes
routerReform.post('/', (req, res) => {
    ReformController.addReform(req.body, req.User, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

//Delete Routes
routerReform.delete('/:id', (req, res) => {
    ReformController.deleteReform(req.params.id, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

//Send email on status change route
routerReform.post('/sendEmailStatus', (req, res) => {
    ReformController.sendEmailOnChangeStatus(
        null,
        req.body.status,
        req.body.email,
        (error, data) => {
            res.json(ResponseHelper.createResponse(error, data, res, true))
        }
    )
})

module.exports = routerReform