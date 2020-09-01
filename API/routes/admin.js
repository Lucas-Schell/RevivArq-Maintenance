const express        = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const AdminController = require('../Controllers/AdminController')

const routerAdmin = express.Router()

//Add Routes
routerAdmin.post('/', (req, res) => {
    AdminController.addAdminUser(req.body, (error, data) => {
        res.json(ResponseHelper.createResponse(error, data, res, true))
    })
})

module.exports = routerAdmin