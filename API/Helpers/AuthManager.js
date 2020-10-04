const constants = require('../config/contants')
const jwt = require('jsonwebtoken')
const models = require('../models/index')
const ResponseHelper = require('../Helpers/ResponseHelper')
const sha256 = require('sha256')

const UserModel = models['Users']

// const users = db.sequelize.model('Users')

class AuthManager {
    static ensureUserToken(req, res, next) {
        if (AuthManager.containsToken(req)) {
            jwt.verify(req.token, constants.APISecretKey, function (err, data) {
                if (err) {
                    let error = {
                        statusDesc: constants.invalidToken,
                        statusCode: constants.errorCodeAuth
                    }
                    res.json(ResponseHelper.createResponse(error, null))
                } else {
                    req.User = data
                    next()
                }
            })
        } else {
            let error = {
                statusDesc: constants.tokenNotFound,
                statusCode: constants.errorCodeAuth
            }
            res.json(ResponseHelper.createResponse(error, null))
        }
    }

    static generateToken(userData) {
        return jwt.sign(userData, constants.APISecretKey, {
            expiresIn: constants.sessionTime
        })
    }

    static ensureValidUser(email, password, callback) {
        UserModel.findOne(
            { email: email },
            '+password +salt',
            (error, userFound) => {
                if (error) {
                    let errorObj = {
                        statusDesc: error,
                        statusCode: constants.errorCodeMongoose
                    }

                    return callback(errorObj, null)
                }

                if (
                    userFound &&
                    userFound.password == sha256(password + userFound.salt)
                ) {
                    userFound = userFound.toObject()
                    delete userFound.password
                    delete userFound.salt
                    delete userFound.__v
                    userFound.id = userFound._id

                    return callback(null, userFound)
                }

                let errorObj = {
                    statusDesc: constants.authenticationFailed,
                    statusCode: constants.errorCodeAuth
                }
                return callback(errorObj, null)
            }
        )
    }

    static containsToken(req) {
        const bearerHeader = req.headers.authorization
        if (bearerHeader !== undefined) {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            req.token = bearerToken
            return true
        } else {
            return false
        }
    }
}

module.exports = AuthManager