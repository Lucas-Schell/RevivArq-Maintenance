const constants = require('../config/contants')
const DAO = require('../DAO/UsersDAO')
const sha256 = require('sha256')
const { validUserRegister } = require('../Helpers/ValidationHelper')
const { login } = require('../Controllers/LoginController')

class UserController {
    /*  Fetch Users:
     *  Retorna uma lista de usuários
     */
    static fetchUsers(query, callback) {
        const orderQuery = UserController.constructOrderQuery(query)
        const whereQuery = UserController.constructWhereQuery(query)

        return DAO.fetchUsers(orderQuery, whereQuery, callback)
    }

    /*  Find User:
     *  retorna as infos do usuário logado.
     */
    static findUser(user, callback) {
        return DAO.findUser(user.id, callback)
    }

    /*  Find User:
     *  retorna as de um usuário pelo id (Somente usuário Administrador consegue chamar).
     */
    static findUserById(user, id, callback) {
        console.log("Entrou")
        if (user.isAdmin)
            return DAO.findUser(id, callback)
        else
            return callback({ statusDesc: constants.invalidPermission, statusCode: constants.errorCodeAuth }, null)
    }

    /*  Add User:
     *  Cria um novo usuário, e retorna-o autenticado caso sucesso
     */
    static addUser(newUserData, callback) {
        const { cpf, password, name, email, lastName, address, civilStatus, cnpj, isAdmin } = newUserData
        const { valid, message } = validUserRegister(cpf, password, name, email, lastName, address, civilStatus, cnpj, isAdmin)

        //Barra caso tentem adicionar um usuario administrador nessa chamada não autenticada
        if (!!isAdmin) {
            const errorObj = { statusDesc: constants.invalidUserAdminAdd, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        //Valida os campos obrigatórios e opcionais
        if (!valid) {
            const errorObj = { statusDesc: message, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        //Gera um salt aleatório
        let salt = UserController.randomSHA256(constants.minRandomNumber, constants.maxRandomNumber)

        //Atualiza os campos do salt e password que serão gravados no banco de dados.
        newUserData.salt = salt
        newUserData.password = sha256(newUserData.password + salt)

        //Adiciona o user no banco, caso de algum problema retorna o erro (callback)
        //se não já loga o usuário e retorna a sessão via o método de login
        return DAO.addUser(newUserData, callback, () => login(email, password, callback))
    }

    /*  Add Admin User (chamada autenticada!)
     *  Cria um novo usuário administrador e retorna sucesso caso não tenha ocorrido nenhum erro
     */
    static addAdminUser(newUserData, callback) {
        const { cpf, password, name, email, lastName, address, civilStatus, cnpj, isAdmin } = newUserData
        const { valid, message } = validUserRegister(cpf, password, name, email, lastName, address, civilStatus, cnpj, isAdmin)

        //Valida os campos obrigatórios e opcionais
        if (!valid) {
            const errorObj = { statusDesc: message, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        //TODO: validar se o usuário que está cadastrando é um sup adm

        //Gera um salt aleatório
        let salt = UserController.randomSHA256(constants.minRandomNumber, constants.maxRandomNumber)

        //Atualiza os campos do salt e password que serão gravados no banco de dados.
        newUserData.salt = salt
        newUserData.password = sha256(newUserData.password + salt)

        //Adiciona o user no banco, caso de algum problema retorna o erro (callback)
        //se não já loga o usuário e retorna a sessão via o método de login
        return DAO.addUser(newUserData, callback)
    }

    static updateUser(user, userDataToUpdate, callback) {
        const { salt, passCode, createdAt, updatedAt, cpf, password, name, email, lastName, address, civilStatus, cnpj, isAdmin, _id } = userDataToUpdate

        if (user.id !== _id) { //somente o própio usuário pode editar suas informações!
            const errorObj = { statusDesc: constants.invalidUserUpdate, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        if (email || salt || password || passCode || createdAt || updatedAt) { //proibindo campos que não podem ser alterados nessa chamada caso tentem mandar na req
            const errorObj = { statusDesc: constants.invalidsFieldToChange, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        const { valid, message } = validUserRegister(cpf, password, name, email, lastName, address, civilStatus, cnpj, false, false)

        //Barra caso tentem adicionar um usuario administrador nessa chamada não autenticada
        if (!!isAdmin) {
            const errorObj = { statusDesc: constants.invalidUserUpdate, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        //Valida os campos obrigatórios e opcionais
        if (!valid) {
            const errorObj = { statusDesc: message, statusCode: constants.invalidFields }
            return callback(errorObj, null)
        }

        DAO.updateUser(userDataToUpdate, callback)
    }

    static deleteUser(idUser, callback) {
        DAO.deleteUser(idUser, callback)
    }

    static constructOrderQuery(query) {
        /**
        * Construção do ORDER BY:
        * 
        * isAscending: Define se a ordenação será ascendente ou descendente. (ASC ou DESC)
        * field: Define por qual atributo da tabela a esquisa será ordenada. Possíveis valores:
        *  id:       id_user
        *  name:     name
        *  username: username 
        *  email:    email
        *  created:  createdAt
        *  updated:  updatedAt
        * 
        *  Verifique a coleção do postman para um exemplo de uso desses campos.
        */
        let orderQuery = {}

        //Definição do valor de isAscending. Por padrão é ASC (Ascendente), se falso será DESC (Descendente).
        orderQuery.isAscending = query.isAscending === 'false' ? '-1' : '1'

        switch (query.sort) {
            case '_id':
                orderQuery.field = '_id'
                break

            case 'id':
                orderQuery.field = '_id'
                break

            case 'name':
                orderQuery.field = 'name'
                break

            case 'username':
                orderQuery.field = 'username'
                break

            case 'email':
                orderQuery.field = 'email'
                break

            case 'created':
                orderQuery.field = 'createdAt'
                break

            case 'updated':
                orderQuery.field = 'updatedAt'
                break

            default: //Campo padrão da ordenação
                orderQuery.field = 'createdAt'
        }

        return orderQuery
    }

    static constructWhereQuery(query) {
        /** 
         * Construição do WHERE:
         * 
         * Possíveis parâmentros:
         * contains: procura pela string informada em todos os campos especificados na função constructWhereClause(), no arquivo UsersDAO.js
         * 
         * Verifique a coleção do postman para um exemplo de uso desse campo.
         */
        let whereQuery = {}
        if (query.contains !== undefined) {
            whereQuery.contains = query.contains
        }

        return whereQuery
    }

    static randomSHA256(low, high) {
        return sha256(UserController.randomInt(low, high))
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low).toString()
    }
}

module.exports = UserController