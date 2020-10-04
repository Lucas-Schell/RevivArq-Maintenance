const express = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const RecoveryController = require('../Controllers/RecoveryController')

const routerRecovery = express.Router()

routerRecovery.post('/generatePassCode', (req, res) => {
    RecoveryController.generatePassCode(req.body.email, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, false))
    })
})

routerRecovery.post('/recoveryPassword', (req, res) => {
    RecoveryController.recoveryPassword(
        req.body.email,
        req.body.passCode,
        req.body.password,
        (error, data) => {
            res.json(ResponseHelper.createResponse(error, data, res, false))
        }
    )
})

module.exports = routerRecovery