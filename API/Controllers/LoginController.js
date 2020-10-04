const constants = require('../config/contants')
const AuthManager = require('../Helpers/AuthManager')

var jwt = require('jsonwebtoken')

class LoginController {
    static login(email, password, callback) {
        console.log('Senha static login: ' + password)
        AuthManager.ensureValidUser(email, password, (error, userData) => {
            if (error != null) {
                return callback(error, null)
            }
            //Generate token
            let token = AuthManager.generateToken(userData)
            return callback(null, { token: token, userData: userData })
        })
    }

    static validateToken(req, callback) {
        AuthManager.containsToken(req)
        jwt.verify(req.token, constants.APISecretKey, (error, data) => {
            if (error) {
                callback(null, false)
            } else {
                callback(null, true)
            }
        })
    }
}

module.exports = LoginController