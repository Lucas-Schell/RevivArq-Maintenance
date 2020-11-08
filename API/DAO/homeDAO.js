const constants = require('../config/Contents')
const models = require('../models/index')
const HomeModel = models['Texts']

function findAll(callback) {
    HomeModel.find({}, function (err, data) {
        if (!err) {
            return callback(null, data[0])
        } else {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
    })
}

function updateTexts(texts, callback) {
    HomeModel.findOneAndUpdate({ unique: true }, texts, (error, text) => {
        if (error) {
            let errorObj = {
                statusDesc: error,
                statusCode: constants.errorCodeMongoose
            }
            return callback(errorObj, null)
        }
        if (!text) {
            let errorObj = {
                statusDesc: constants.notFoundDesc,
                statusCode: constants.notFound
            }
            return callback(errorObj, null)
        } else {
            callback(null, { message: constants.successCode })
        }
    })
}

module.exports.findAll = findAll
module.exports.updateTexts = updateTexts
