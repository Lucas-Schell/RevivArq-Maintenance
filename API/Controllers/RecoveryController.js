const DAO = require('../DAO/UsersDAO')
const sha256 = require('sha256')
const EmailSenderHelper = require('../Helpers/EmailSenderHelper')
const { validPassword } = require('../Helpers/ValidationHelper')
const constants = require('../config/contants')

class RecoveryController {
    /**
     * Gerar codigo provisório para recuperar a senha
     */
    static generatePassCode(email, callback) {
        var passCode = this.generatePassword()
        DAO.updatePassCode(email, passCode, callback, () =>
            EmailSenderHelper.sendEmailWithPassCodeRecovery(email, passCode)
        )
    }

    /*
     * Esse método solicita ao DAO para alterar a senha,
     * passando um e-mail
     */
    static recoveryPassword(email, passCode, password, callback) {
        if (validPassword(password)) {
            let salt = RecoveryController.randomSHA256(
                constants.minRandomNumber,
                constants.maxRandomNumber
            )
            const hashedPassword = sha256(password + salt)
            DAO.updateUserByPassCode(
                email,
                passCode,
                hashedPassword,
                salt,
                callback
            )
        } else {
            const errorObj = {
                statusDesc: constants.invalidPassword,
                statusCode: constants.invalidFields
            }
            return callback(errorObj, null)
        }
    }

    static sendEmailOnRecoveryPassword(email, callback) {
        EmailSenderHelper.sendEmailOnRecoveryPassword(email, callback)
    }

    /*
     * Gera uma senha aleatória
     */
    static generatePassword() {
        var result = ''
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < 8; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            )
        }
        return result
    }

    static randomSHA256(low, high) {
        return sha256(RecoveryController.randomInt(low, high))
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low).toString()
    }
}

module.exports = RecoveryController;
