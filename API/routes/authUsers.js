const express = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const UserController = require('../Controllers/UserController')

const routerAuthUser = express.Router()

//Find Routes
routerAuthUser.get('/', (req, res) => {
    UserController.findUser(req.User, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

//Update Routes
routerAuthUser.put('/', (req, res) => {
    UserController.updateUser(req.User, req.body, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

//Find Routes
routerAuthUser.get('/user', (req, res) => {
    UserController.findUserById(req.User, req.query.id, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

module.exports = routerAuthUser