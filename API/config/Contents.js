class Constants {
    // API KEY
    static get APISecretKey() {
        return 'Esta é uma chave secreta para a autenticação de tokens. Use uma string aleatória.'
    }

    // API CODES
    static get successCode() {
        return 0
    }

    static get errorCodeMongoose() {
        return 1
    }

    static get errorCodeAuth() {
        return 2
    }

    static get notFound() {
        return 3
    }

    static get invalidFields() {
        return 4
    }

    static get invalidUser() {
        return 5
    }

    static get duplicateKey() {
        return 11000
    }

    // API DESCRIPTION CODES
    static get successDesc() {
        return 'Successo'
    }

    static get notFoundDesc() {
        return 'Registro não encontrado'
    }

    static get invalidPassCode() {
        return 'Código informado inválido.'
    }

    static get authenticationFailed() {
        return 'Usuário ou senha inválidos'
    }

    static get invalidToken() {
        return 'Token inválido'
    }

    static get tokenNotFound() {
        return 'Token não encontrado'
    }

    static get invalidCpf() {
        return 'CPF inválido'
    }

    static get invalidCnpj() {
        return 'CNPJ inválido'
    }

    static get invalidPassword() {
        return 'Senha deve conter de 6 a 11 caracteres'
    }

    static get invalidName() {
        return 'Nome inválido'
    }

    static get invalidFullName() {
        return 'Sobrenome inválido'
    }

    static get invalidEmail() {
        return 'E-mail inválido'
    }

    static get emailAlreadyRegistered() {
        return 'E-mail já cadastrado'
    }

    static get invalidStreet() {
        return 'Rua inválida'
    }

    static get invalidNumber() {
        return 'Número inválida'
    }

    static get invalidComplement() {
        return 'Complemento inválido'
    }

    static get invalidNeighborhood() {
        return 'Bairro inválido'
    }

    static get invalidCity() {
        return 'Cidade inválida'
    }

    static get invalidUF() {
        return 'UF Inválida'
    }

    static get invalidCEP() {
        return 'CEP Inválido'
    }

    static get invalidCivilStatus() {
        return 'Estado Civil Inválido'
    }

    static get invalidUserAdminAdd() {
        return 'Inserção de usuário invalida'
    }

    static get invalidUserUpdate() {
        return 'Atualização de usuário invalida'
    }

    static get userIsNotAdmin() {
        return 'Usuário não é um administrador'
    }

    static get userNotFound() {
        return 'Usuário não encontrado.'
    }

    // GENERAL CONSTANTS
    static get minRandomNumber() {
        return 100000000000
    }

    static get maxRandomNumber() {
        return 999999999999
    }

    static get sessionTime() {
        return '1h'
    }

    //EMAIL SENDER DATA
    static get returnEmailSender() {
        return 'miguel.barros1889@gmail.com'
    }

    static get returnPasswordSender() {
        return 'Mb12345678'
    }

    static get returnSMTPProvider() {
        return 'Gmail'
    }

    // STATUS E-MAIL
    static get emailRequestCreated() {
        return 'Olá! Seu pedido de requisição foi aberta!'
    }

    static get emailRequestCreatedSubject() {
        return 'Revivarq: Seu pedido foi iniciado!'
    }

    static get emailRequestAccepted() {
        return 'Olá! Seu pedido de solicitação foi aceito. Em breve você receberá uma resposta!'
    }

    static get emailRequestAcceptedSubject() {
        return 'Revivarq: Seu pedido foi aceito!'
    }

    static get emailRequestCancelled() {
        return 'Olá! Sua solicitação foi cancelada!'
    }

    static get emailRequestCanceledSubject() {
        return 'Revivarq: Seu pedido foi cancelado!'
    }

    static get emailRequestFinished() {
        return 'Olá! Seu pedido foi finalizado!'
    }

    static get emailRequestFinishedSubject() {
        return 'Revivarq: Seu pedido foi finalizado!'
    }

    static get emailRecoveryPasswordMessage() {
        return 'Sua senha foi alterada, nova senha: '
    }

    static get emailRecoveryPasswordSubject() {
        return 'Revivarq: Alteração de senha'
    }

    static get emailRecoveryPassCodeMessage() {
        return 'Olá, seu código para recuperação da conta no RevivArq é: '
    }

    static get emailRecoveryPassCodeSubject() {
        return 'Revivarq: Recuperação da conta'
    }

    static get reformUpdated() {
        return 'Solicitação atualizada com sucesso!'
    }

    static get passwordUpdated() {
        return 'Senha atualizada com sucesso, realize o acesso com a nova senha!'
    }

    static get invalidReformStatus() {
        return 'Status da reforma inválido.'
    }

    static get invalidEstablishment() {
        return 'Estabelecimento inválido.'
    }

    static get invalidArea() {
        return 'Área da solicitação inválida.'
    }

    static get invalidGoal() {
        return 'Objetivo inválido.'
    }

    static get invalidRestrictions() {
        return 'Restrições inválidas.'
    }

    static get invalidBudgetLimit() {
        return 'Orçamento inválido.'
    }

    static get invalidAddress() {
        return 'Endereço inválido.'
    }

    static get invalidOutros() {
        return 'Outros inválidos.'
    }

    static get invalidReformItens() {
        return 'Itens da reforma inválidos.'
    }

    static get invalidPlaceName() {
        return 'Nome do estabelecimen to inválido.'
    }

    static get userIdNotFound() {
        return 'Id do usuário não encontrado.'
    }

    static get invalidPhone() {
        return 'Número de telefone inválido.'
    }

    static emailRequestUpdated(name, establishmentName) {
        return `Olá! Informamos que o usuário ${name} atualizou a solicitação de orçamento de ${establishmentName}.`
    }

    static emailRequestUpdatedSubject(establishmentName) {
        return `Revivarq: Atualização de pedido  - ${establishmentName}`
    }

    static emailRequestCreatedAdm(name, establishmentName) {
        return `Olá! Informamos que o usuário ${name} criou uma nova solicitação de orçamento de ${establishmentName}.`
    }

    static emailRequestUpdatedSubjectAdm(establishmentName) {
        return `Revivarq: Nova solicitação - ${establishmentName}`
    }

    static get invalidsFieldToChange() {
        return 'Não foi possivel realizar a alteração pois alguns campos enviados não são permitidos!'
    }

    static get invalidPermission() {
        return 'Acesso negado a este recurso!'
    }
}

module.exports = Constants
