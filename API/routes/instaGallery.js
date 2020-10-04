const express = require('express')
const ResponseHelper = require('../Helpers/ResponseHelper')
const Instagram = require('node-instagram').default

const routerIg = express.Router()

const instagram = new Instagram({
    clientId: 'e21f476a46134d7599535df7433dafc3',
    clientSecret: '12417fdb8cb548eb9588891b5230c962',
    accessToken: '19519897060.e21f476.e6167b5e9c6346768364ba38ac736d1a'
})

routerIg.get('/', function (req, res) {
    instagram.get('users/self/media/recent', (error, data) => {
        res.json(ResponseHelper.createResponse(error, data.data, res, false))
    })
})

module.exports = routerIg