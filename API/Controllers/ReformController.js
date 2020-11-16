const DAO = require('../DAO/reformsDAO')
const EmailSenderHelper = require('../Helpers/EmailSenderHelper')
const {
    validReformRegister,
    validChat
} = require('../Helpers/ValidationHelper')
const constants = require('../config/Contents')

class ReformController {
    /**
     * busca as reformas validando se é uma consulta de um admin ou
     * de um usuário comum.
     */
    static fetchReforms(user, callback) {
        return DAO.fetchReforms(user.id, callback, user.isAdmin)
    }

    /**
     * atualizar uma reforma, validando campos necessários.
     * obs: não atualiza as fotos.
     */
    static updateReform(reform, user, callback) {
        console.log(reform.photos)
        if (!reform.updateChat) {
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
                phone,
                photos
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
                    phone,
                    photos
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
        } else {
            const { valid, message } = validChat(reform.chat)
            if (!valid) {
                const errorObj = {
                    statusDesc: message,
                    statusCode: constants.invalidFields
                }
                return callback(errorObj, null)
            }
            return DAO.updateChat(reform._id, reform.chat, callback)
        }
    }

    static fetchReform(user, body, callback) {
        return DAO.fetchReform(user.id, body._id, callback, user.isAdmin)
    }

    static findAll(callback) {
        return DAO.findAll(callback)
    }

    static findReform(idReform, callback) {
        return DAO.findReform(idReform, callback)
    }

    static addReform(newReformData, user, callback) {
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
            phone
        } = newReformData
        const { name, lastName } = user
        const author = name + ' ' + lastName
        newReformData.author = author

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

        if (!valid) {
            const errorObj = {
                statusDesc: message,
                statusCode: constants.invalidFields
            }
            return callback(errorObj, null)
        }

        return DAO.addReform(newReformData, callback, () =>
            this.sendEmailOnChangeStatus(
                5,
                constants.returnEmailSender,
                author,
                newReformData.establishmentName
            )
        )
    }

    static deleteReform(idReform, callback) {
        return DAO.deleteReform(idReform, callback)
    }

    static async sendEmailOnChangeStatus(
        status,
        email,
        name,
        establishmentName
    ) {
        EmailSenderHelper.sendEmailOnChangeStatus(
            status,
            email,
            name,
            establishmentName
        )
    }
}

module.exports = ReformController
