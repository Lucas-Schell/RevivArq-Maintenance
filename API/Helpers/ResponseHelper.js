const constants = require('../config/contants')

class ResponseHelper {
    static createResponse(error, data) {
        let json = {}
        if (!error) {
            json = {
                statusCode: constants.successCode,
                statusDesc: constants.successDesc,
                data: data
            }
        } else {
            json = {
                statusCode: error.statusCode,
                statusDesc: error.statusDesc,
                data: data
            }
        }
        return json
    }
}

module.exports = ResponseHelper