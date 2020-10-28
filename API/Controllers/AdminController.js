const constants = require('../config/Contents')
const DAO = require('../DAO/UsersDAO')
const sha256 = require('sha256')
const { validUserRegister } = require('../Helpers/ValidationHelper')

class AdminController {
    /*  Add Admin User
     *  Cria um novo usuário administrador e retorna sucesso caso não tenha ocorrido nenhum erro
     */
    static addAdminUser(newUserData, callback) {
        const {
            cpf,
            password,
            name,
            email,
            lastName,
            address,
            civilStatus,
            cnpj,
            isAdmin,
            id
        } = newUserData
        const { valid, message } = validUserRegister(
            cpf,
            password,
            name,
            email,
            lastName,
            address,
            civilStatus,
            cnpj,
            isAdmin
        )

        //Valida os campos obrigatórios e opcionais
        if (!valid) {
            const errorObj = {
                statusDesc: message,
                statusCode: constants.invalidFields
            }
            return callback(errorObj, null)
        }

        if (DAO.findAdminUser(id, callback)) {
            //Gera um salt aleatório
            let salt = AdminController.randomSHA256(
                constants.minRandomNumber,
                constants.maxRandomNumber
            )

            //Atualiza os campos do salt e password que serão gravados no banco de dados.
            newUserData.salt = salt
            newUserData.password = sha256(newUserData.password + salt)

            //Adiciona o user no banco, caso de algum problema retorna o erro (callback)
            //se não já loga o usuário e retorna a sessão via o método de login
            return DAO.addUser(newUserData, callback)
        } else {
            let errorObj = {
                statusDesc: constants.userIsNotAdmin,
                statusCode: constants.invalidUser
            }
            return callback(errorObj, null)
        }
    }

    static randomSHA256(low, high) {
        return sha256(AdminController.randomInt(low, high))
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low).toString()
    }

    static findAdminUser(id, callback) {
        return DAO.findAdminUser(id, callback)
    }
}

module.exports = AdminController
