const models     = require("./models")
const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')

const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')
const routerAuthUser = require('./routes/authUsers')
const adminRouter = require('./routes/admin')
const reformRouter = require('./routes/reform')
const recoveryRouter = require('./routes/recover')
const instaGaleriaRouter = require('./routes/instaGallery')
const photosRouter = require('./routes/photos')


const TokenManager = require('./Helpers/AuthManager')
var config = require('./config/config')

// Initialize server
// models.sequelize.sync().then(function() {
//     setupServer()
// }) 

setupServer()

function setupServer() {
    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use('/api/login', loginRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/auth_user', TokenManager.ensureUserToken, routerAuthUser)
    app.use('/api/admin', TokenManager.ensureUserToken, adminRouter)
    app.use('/api/reform', TokenManager.ensureUserToken, reformRouter)
    app.use('/api/InstaGaleria', instaGaleriaRouter)
    app.use('/api/recover', recoveryRouter)
    app.use('/api/photos', photosRouter)
    
    app.listen(config.app.port, function () {
        console.log(`Server listening on port ${config.app.port}`)
    })
}