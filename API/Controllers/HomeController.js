const DAO = require('../DAO/homeDAO')
const constants = require('../config/Contents')

class HomeController {
    static getTexts(callback) {
        return DAO.findAll(callback)
    }

    static updateReform(reform, user, callback) {
        const {
            userId,
            establishmentName,
            establishmentType,
            reformItens,
            status,
            area,
            address,
            goal,
            restrictions,
            budgetLimit,
            _id,
            phone
        } = reform
        const { valid, message } = validReformRegister(
            userId,
            establishmentName,
            establishmentType,
            status,
            area,
            address,
            goal,
            restrictions,
            budgetLimit,
            reformItens,
            phone
        )
        const { isAdmin, name, lastName } = user

        if (!valid) {
            const errorObj = {
                statusDesc: message,
                statusCode: constants.invalidFields
            }
            return callback(errorObj, null)
        }

        let filteredReform
        if (isAdmin) {
            //é admin. somente consegue alterar o STATUS
            filteredReform = { _id, status }
        } else {
            //consegue alterar todas as informações editaveis EXCETO o status.
            const author = user.name + ' ' + user.lastName
            filteredReform = {
                _id,
                establishmentType,
                area,
                address,
                goal,
                restrictions,
                budgetLimit,
                establishmentName,
                reformItens,
                author,
                phone
            }
        }

        return DAO.updateReform(filteredReform, callback, isAdmin, () =>
            this.sendEmailOnChangeStatus(
                4,
                constants.returnEmailSender,
                name + ' ' + lastName,
                establishmentName
            )
        )
    }
}

module.exports = HomeController
