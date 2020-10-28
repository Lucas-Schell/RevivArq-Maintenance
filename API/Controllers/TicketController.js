const EmailSenderHelper = require('../Helpers/EmailSenderHelper')

class TicketController {
    static createEmail(req) {
        EmailSenderHelper.sendEmailTicket(
            req.body.name,
            req.body.email,
            req.body.message
        )
    }
}
module.exports = TicketController
