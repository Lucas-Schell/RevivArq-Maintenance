const express        = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const UserController = require('../Controllers/UserController')

const routerUsers = express.Router()

//Add Routes
routerUsers.post('/', (req, res) => {
    UserController.addUser(req.body, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

module.exports = routerUsers