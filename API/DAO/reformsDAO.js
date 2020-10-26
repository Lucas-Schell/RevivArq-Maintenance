const constants = require('../config/contants')
const models = require('../models/index')
const ReformModel = models['Reforms']

/*
 * Retorna todos os usuários no banco
 */
function fetchReforms(id, callback, getAll = false) {
    ReformModel.find(getAll ? {} : { userId: id }).exec((error, reforms) => {
        if (error) {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
        callback(null, reforms)
    })
}

function fetchReform(user, id, callback, getAll = false) {
    ReformModel.find(getAll ? {} : { userId: user }).exec((error, reforms) => {
        if (error) {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }

        reforms.forEach((reformEach) => {
            if (reformEach.id === id) {
                callback(null, reformEach)
            }
        })
    })
}

function findAll(callback) {
    ReformModel.find({}, function (err, data) {
        if (!err) {
            return callback(null, data)
        } else {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
    })
}

function findReform(id, callback) {
    return ReformModel.findById(id, (error, reform) => {
        if (error) {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
        if (!reform) {
            // não há usuário com este id
            let errorObj = {
                statusDesc: constants.notFoundDesc,
                statusCode: constants.notFound
            }
            return callback(errorObj, null)
        }
        callback(null, reform)
    })
}

function addReform(reform, callback, callbackSendMail) {
    const newReform = new ReformModel(reform)
    newReform.save((error, reform) => {
        if (reform) {
            callbackSendMail()
            callback(null, reform)
        } else {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
    })
}

function deleteReform(id, callback) {
    ReformModel.findByIdAndRemove(id, (error, reform) => {
        if (error) {
            return callback(error, null)
        }
        if (!reform) {
            let errorObj = {
                statusDesc: constants.notFoundDesc,
                statusCode: constants.notFound
            }
            return callback(errorObj, null)
        } else {
            callback(null, reform)
        }
    })
}

/*
 * Modifica uma reforma no banco
 */
function updateReform(filteredReform, callback, isAdmin, callbackSendMail) {
    ReformModel.findByIdAndUpdate(
        filteredReform._id,
        filteredReform,
        (error, reform) => {
            if (error) {
                let errorObj = {
                    statusDesc: error,
                    statusCode: constants.errorCodeMongoose
                }
                return callback(errorObj, null)
            }
            if (!reform) {
                let errorObj = {
                    statusDesc: constants.notFoundDesc,
                    statusCode: constants.notFound
                }
                return callback(errorObj, null)
            } else {
                if (!isAdmin)
                    //manda email para o adm avisando a atualização
                    callbackSendMail()

                callback(null, { message: constants.reformUpdated }) //retorna apenas uma mensagem de sucesso, talvez nem tenha necessidade...
            }
        }
    )
}

module.exports.fetchReforms = fetchReforms
module.exports.fetchReform = fetchReform
module.exports.findReform = findReform
module.exports.deleteReform = deleteReform
module.exports.addReform = addReform
module.exports.findAll = findAll
module.exports.updateReform = updateReform
