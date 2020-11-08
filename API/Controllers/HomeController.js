const DAO = require('../DAO/homeDAO')
const constants = require('../config/Contents')

class HomeController {
    static getTexts(callback) {
        return DAO.findAll(callback)
    }

    static updateTexts(texts, user, callback) {
        const { isAdmin } = user

        if (!isAdmin) {
            const errorObj = {
                statusDesc: message,
                statusCode: constants.userIsNotAdmin
            }
            return callback(errorObj, null)
        }

        return DAO.updateTexts(texts, callback)
    }
}

module.exports = HomeController
