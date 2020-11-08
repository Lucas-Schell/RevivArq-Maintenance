const constants = require('../config/Contents')
const models = require('../models/index')
const HomeModel = models['Texts']

function findAll(callback) {
    HomeModel.find({}, function (err, data) {
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

function updateReform(filteredReform, callback, isAdmin, callbackSendMail) {
    HomeModel.findByIdAndUpdate(
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

module.exports.findAll = findAll
module.exports.updateReform = updateReform
