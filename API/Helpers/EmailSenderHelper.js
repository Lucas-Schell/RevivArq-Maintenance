const constants = require('../config/contants')
const nodemailer = require('nodemailer')

class EmailSenderHelper {
    /**
     * Função que envia emails.
     * @param {Mensagem} msg
     * @param {Assunto} subject
     * @param {Destinatário} recipent
     */
    static sendEmail(msg, subject, recipent) {
        var transport = nodemailer.createTransport({
            service: constants.returnSMTPProvider,
            auth: {
                user: constants.returnEmailSender,
                pass: constants.returnPasswordSender
            }
        })
        var mailOptions = {
            from: constants.returnEmailSender, // sender address
            to: recipent, // list of receivers
            subject: subject, // Subject line
            text: msg
        }
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
        })
    }

    /**
     *
     * @param {Novo status} status
     * @param {Destinatário} email
     */
    static sendEmailOnChangeStatus(status, email, name, establishmentName) {
        switch (status) {
            case 0:
                // pedido criado
                this.sendEmail(
                    constants.emailRequestCreated,
                    constants.emailRequestCreatedSubject,
                    email
                )
                break
            case 1:
                // pedido aceito pela adm
                this.sendEmail(
                    constants.emailRequestAccepted,
                    constants.emailRequestAcceptedSubject,
                    email
                )
                break
            case 2:
                // pedido cancelado pela adm
                this.sendEmail(
                    constants.emailRequestCancelled,
                    constants.emailRequestCanceledSubject,
                    email
                )
                break
            case 3:
                // pedido finalizado pela adm
                this.sendEmail(
                    constants.emailRequestFinished,
                    constants.emailRequestFinishedSubject,
                    email
                )
                break
            case 4:
                //pedido atualizado pelo usuário
                this.sendEmail(
                    constants.emailRequestUpdated(name, establishmentName),
                    constants.emailRequestUpdatedSubject(establishmentName),
                    email
                )
                break
            case 5:
                //pedido criado por um usuário
                this.sendEmail(
                    constants.emailRequestCreatedAdm(name, establishmentName),
                    constants.emailRequestUpdatedSubjectAdm(establishmentName),
                    email
                )
                break

            default:
                break
        }
    }

    /**
     *
     * @param {Destinatário} email
     * @param {Nova senha} password
     */
    static sendEmailOnRecoveryPassword(email, password) {
        this.sendEmail(
            constants.emailRecoveryPasswordMessage.concat(password),
            constants.emailRecoveryPasswordSubject,
            email
        )
    }

    static sendEmailWithPassCodeRecovery(email, passCode) {
        this.sendEmail(
            constants.emailRecoveryPassCodeMessage.concat(passCode),
            constants.emailRecoveryPassCodeSubject,
            email
        )
    }
}

module.exports = EmailSenderHelper
