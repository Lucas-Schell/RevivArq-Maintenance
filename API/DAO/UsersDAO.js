const constants = require('../config/Contents')
const models = require('../models/index')
const UserModel = models['Users']

/*
 * Retorna todos os usuários no banco
 */
function fetchUsers(orderQuery, whereQuery, callback) {
    const where = createWhereClause(whereQuery)
    const order = createOrderClause(orderQuery)

    UserModel.find(where)
        .sort(order)
        .exec((error, users) => {
            if (error) {
                let errorObj = {
                    statusDesc: error,
                    statusCode: constants.errorCodeMongoose
                }
                return callback(errorObj, null)
            }
            callback(null, users)
        })
}

/*
 * Retorna o usuário com o id especificado
 */
function findUser(id, callback) {
    UserModel.findById(
        id,
        /*'+password -salt',*/ (error, user) => {
            // ativar +password indica que ira vir com a senha, -salt para não incluir o sal na consulta
            if (error) {
                let errorObj = {
                    statusDesc: error,
                    statusCode: constants.errorCodeMongoose
                }
                return callback(errorObj, null)
            }
            if (!user) {
                // não há usuário com este id
                let errorObj = {
                    statusDesc: constants.notFoundDesc,
                    statusCode: constants.notFound
                }
                return callback(errorObj, null)
            }
            callback(null, user)
            return false
        }
    )
}

function findAdminUser(id, callback) {
    return UserModel.findById(id, (error, user) => {
        if (error) {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
        if (!user) {
            let errorObj = {
                statusDesc: constants.userNotFound,
                statusCode: constants.notFound
            }
            return callback(errorObj, null)
        }
        return !!user.isAdmin
    })
}

/*
 * Adiciona um usuário ao banco
 */
function addUser(user, callback, doLogin) {
    const newUser = new UserModel(user)

    newUser.save((error, createdUser) => {
        if (createdUser && doLogin) doLogin()
        else if (createdUser) callback(null, createdUser)
        else {
            const { code } = error
            if (code === constants.duplicateKey) {
                //email já cadastrado
                error = {
                    statusDesc: constants.emailAlreadyRegistered,
                    statusCode: constants.invalidFields
                }
            }
            callback(error, null)
        }
    })
}

/*
 * Modifica um usuário no banco
 */
function updateUser(newUserData, callback) {
    // No banco é _id e não id!
    const id = newUserData._id ? newUserData._id : newUserData.id

    if (!id) {
        let errorObj = {
            statusDesc: constants.notFoundDesc + '. Nenhum id foi fornecido!',
            statusCode: constants.notFound
        }
        return callback(errorObj, null)
    }

    UserModel.findByIdAndUpdate(newUserData._id, newUserData, (error, user) => {
        if (error) {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
        if (!user) {
            let errorObj = {
                statusDesc: constants.notFoundDesc,
                statusCode: constants.notFound
            }
            return callback(errorObj, null)
        } else {
            callback(null, { message: 'Informações atualizadas com sucesso!' })
        }
    })
}

/*
 * Deleta um usuário do banco
 */
function deleteUser(id, callback) {
    UserModel.findByIdAndRemove(id, (error, user) => {
        if (error) {
            return callback(error, null)
        }
        if (!user) {
            let errorObj = {
                statusDesc: constants.notFoundDesc,
                statusCode: constants.notFound
            }
            return callback(errorObj, null)
        } else {
            callback(null, user)
        }
    })
}

function createOrderClause(query) {
    // Algoritmo para Sort de field unico, na controller monta-se a query para que ela seja transformada aqui.
    // Se quiserem sort de multiplos fields ver documentação do Mongoose e adaptar
    return { [query.field]: query.isAscending }
}

function createWhereClause(query) {
    if (query.contains !== undefined) {
        query.$or = [
            // equivalente à new RegExp(query.contains, "i")
            { name: { $regex: `${query.contains}`, $options: 'i' } },
            { username: { $regex: `${query.contains}`, $options: 'i' } },
            { email: { $regex: `${query.contains}`, $options: 'i' } }
        ]
    }
    delete query.contains

    return query
}

/*
 * Função de procurar um e-mail enviado, alterar a senha a
 * partir de uma gerada aleatoriamente e retornar o user
 */
function findUserByEmail(email, password, callback) {
    return UserModel.updateOne(
        { email: email },
        { password: password },
        (error, response) => {
            if (error) {
                //algum erro
                let errorObj = {
                    statusDesc: error,
                    statusCode: constants.errorCodeMongoose
                }
                callback(errorObj, null)
                return false
            }

            if (response.nModified === 0) {
                //e-mail nao encontrado
                let errorObj = {
                    statusDesc: constants.notFoundDesc,
                    statusCode: constants.notFound
                }
                callback(errorObj, null)
                return false
            }
            callback(null, response)
            return true
        }
    )
}

function updateUserByPassCode(email, passCode, password, salt, callback) {
    return UserModel.updateOne(
        { passCode: passCode, email: email },
        { password: password, salt: salt },
        (error, user) => {
            if (error) {
                //algum erro
                let errorObj = {
                    statusDesc: error,
                    statusCode: constants.errorCodeMongoose
                }
                callback(errorObj, null)
                return false
            }

            if (user.nModified === 0) {
                //usuario nao encontrado
                let errorObj = {
                    statusDesc: constants.invalidPassCode,
                    statusCode: constants.notFound
                }
                callback(errorObj, null)
                return false
            }
            callback(null, { message: constants.passwordUpdated })
            return true
        }
    )
}

function updatePassCode(email, passCode, callback, sendEmail) {
    return UserModel.updateOne({ email: email }, { passCode: passCode })
        .lean()
        .exec((error, user) => {
            if (error) {
                //algum erro
                let errorObj = {
                    statusDesc: error,
                    statusCode: constants.errorCodeMongoose
                }
                callback(errorObj, null)
                return false
            }

            if (user.nModified === 0) {
                //e-mail nao encontrado
                let errorObj = {
                    statusDesc: constants.invalidEmail,
                    statusCode: constants.notFound
                }
                callback(errorObj, null)
                return false
            }
            sendEmail() //envia o email
            return callback(null, {})
        })
}

module.exports.fetchUsers = fetchUsers
module.exports.findUserByEmail = findUserByEmail
module.exports.findUser = findUser
module.exports.addUser = addUser
module.exports.deleteUser = deleteUser
module.exports.updateUser = updateUser
module.exports.findAdminUser = findAdminUser
module.exports.updatePassCode = updatePassCode
module.exports.updateUserByPassCode = updateUserByPassCode
