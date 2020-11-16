const constants = require('../config/Contents')
const AuthManager = require('../Helpers/AuthManager')

const jwt = require('jsonwebtoken')

class LoginController {
    static login(email, password, callback) {
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
        jwt.verify(req.token, constants.APISecretKey, (error) => {
            if (error) {
                callback(null, false)
            } else {
                callback(null, true)
            }
        })
    }
}

module.exports = LoginController
