const express = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const HomeController = require('../Controllers/HomeController')

const routerTexts = express.Router()

//All reforms
routerTexts.get('/', (req, res) => {
    HomeController.getTexts((error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, false))
    })
})

//update reforms
routerTexts.put('/', (req, res) => {
    HomeController.updateTexts(req.body, req.User, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, null, true))
    })
})

module.exports = routerTexts
