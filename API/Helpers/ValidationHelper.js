const constants = require('../config/contants')

class ValidationHelper {
    /**
     * Enum Estado Civil
     */
    static get CivilStatusEnum() {
        return {
            SINGLE: 'Solteiro(a)',
            MARRIED: 'Casado(a)',
            DIVORCED: 'Divorciado(a)',
            WIDOWER: 'Viúvo(a)',
            SEPARATE: 'Separado(a)'
        }
    }

    /**
     * Enum Status da reforma
     */
    static get ReformStatusEnum() {
        return {
            REQUESTED_BUDGET: 'Orçamento Solicitado',
            IN_PROGRESS: 'Em Andamento',
            STOPPED: 'Parado',
            APPROVED: 'Aprovado'
        }
    }

    /**
     * Validador de status da reforma
     * @param {*} civilStatus
     * @return Boolean
     */
    static validReformStatus(reformStatus) {
        return (
            this.ReformStatusEnum.REQUESTED_BUDGET === reformStatus ||
            this.ReformStatusEnum.IN_PROGRESS === reformStatus ||
            this.ReformStatusEnum.STOPPED === reformStatus ||
            this.ReformStatusEnum.APPROVED === reformStatus
        )
    }

    static get UFs() {
        return [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
        ]
    }

    /**
     * Validador de CPF
     * @param {*} cpf
     * @return Boolean
     */
    static validCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '')

        if (cpf === '') return false
        if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        )
            return false

        let add = 0
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
        let rev = 11 - (add % 11)
        if (rev === 10 || rev === 11) rev = 0
        if (rev !== parseInt(cpf.charAt(9))) return false

        add = 0
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
        rev = 11 - (add % 11)
        if (rev === 10 || rev === 11) rev = 0
        return rev === parseInt(cpf.charAt(10))
    }

    /**
     * Validador de CNPJ
     * @param {*} cnpj
     * @return Boolean
     */
    static validCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '')

        if (cnpj == '') return false
        if (cnpj.length != 14) return false

        // Elimina CNPJs invalidos conhecidos
        if (
            cnpj == '00000000000000' ||
            cnpj == '11111111111111' ||
            cnpj == '22222222222222' ||
            cnpj == '33333333333333' ||
            cnpj == '44444444444444' ||
            cnpj == '55555555555555' ||
            cnpj == '66666666666666' ||
            cnpj == '77777777777777' ||
            cnpj == '88888888888888' ||
            cnpj == '99999999999999'
        )
            return false

        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho)
        var digitos = cnpj.substring(tamanho)
        var soma = 0
        var pos = tamanho - 7
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
        if (resultado != digitos.charAt(0)) return false

        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
        if (resultado != digitos.charAt(1)) return false

        return true
    }

    /**
     * Validador de senha
     * @param {*} password
     * @return Boolean
     */
    static validPassword(password) {
        return !!password && password.length >= 6 && password.length <= 11
    }

    /**
     * Validador de nome
     * @param {*} name
     * @return Boolean
     */
    static validName(name) {
        return !!name && name.length > 0 && name.length <= 30
    }

    /**
     * Validador de sobrenome
     * @param {*} lastName
     * @return Boolean
     */
    static validLastName(lastName) {
        return !!lastName && lastName.length > 0 && lastName.length <= 50
    }

    /**
     * Validador de rua
     * @param {*} name
     * @return Boolean
     */
    static validStreet(street) {
        return !!street && street.length > 0 && street.length <= 50
    }

    /**
     * Validador de cep
     * @param {*} cep
     * @return Boolean
     */
    static validCep(cep) {
        return !!cep && cep.length === 8
    }

    /**
     * Validador de email
     * @param {*} email
     * @return Boolean
     */
    static validEmail(email) {
        return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    /**
     * Validador de estado civil
     * @param {*} civilStatus
     * @return Boolean
     */
    static validCivilStatus(civilStatus) {
        return (
            this.CivilStatusEnum.SINGLE === civilStatus ||
            this.CivilStatusEnum.MARRIED === civilStatus ||
            this.CivilStatusEnum.DIVORCED === civilStatus ||
            this.CivilStatusEnum.WIDOWER === civilStatus ||
            this.CivilStatusEnum.SEPARATE === civilStatus
        )
    }

    /**
     * Validador de rua (endereço)
     * @param {*} street
     * @return Boolean
     */
    static validStreet(street) {
        return !!street && street.length > 0 && street.length <= 50
    }

    /**
     * Validador de número (endereço)
     * @param {*} number
     * @return Boolean
     */
    static validNumber(number) {
        return !!number && number > 0
    }

    /**
     * Validador de complemento (endereço)
     * @param {*} complement
     * @return Boolean
     */
    static validComplement(complement) {
        return !!complement && complement.length > 0 && complement.length <= 50
    }

    /**
     * Validador de bairro (endereço)
     * @param {*} neighborhood
     * @return Boolean
     */
    static validNeighborhood(neighborhood) {
        return (
            !!neighborhood &&
            neighborhood.length > 0 &&
            neighborhood.length <= 40
        )
    }

    /**
     * Validador de cidade (endereço)
     * @param {*} neighborhood
     * @return Boolean
     */
    static validCity(city) {
        return !!city && city.length > 0 && city.length <= 40
    }

    /**
     * Validador de UF
     * @param {*} UF
     * @return Boolean
     */
    static validUF(uf) {
        return !!uf && ValidationHelper.UFs.includes(uf)
    }

    /**
     * Validador de tipo de estabelecimento
     * @param {*} establishmentType
     * @return Boolean
     */
    static validEstablishmentType(establishmentType) {
        return (
            !!establishmentType &&
            establishmentType.length > 0 &&
            establishmentType.length <= 50
        )
    }

    /**
     * Validador do nome do estabelecimento
     * @param {*} establishmentType
     * @return Boolean
     */
    static validEstablishmentName(establishmentName) {
        return !!establishmentName && establishmentName.length <= 60
    }

    /**
     * Validador de área do estabelecimento
     * @param {*} area
     * @return Boolean
     */
    static validArea(area) {
        return !!area && !isNaN(area) && area > 0 && area <= 999999
    }

    /**
     * Validador do objetivo
     * @param {*} goal
     * @return Boolean
     */
    static validGoal(goal) {
        return !!goal && goal.length <= 100
    }

    /**
     * Validador do telefone
     * @param {*} phone
     * @return Boolean
     */
    static validPhone(phone) {
        return !!phone && phone.length <= 20
    }

    /**
     * Validador das restrições
     * @param {*} restrictions
     * @return Boolean
     */
    static validRestrictions(restrictions) {
        return !!restrictions && restrictions.length <= 100
    }

    /**
     * Validador do limite de orçamento
     * @param {*} budgetLimit
     * @return Boolean
     */
    static validBudgetLimit(budgetLimit) {
        return (
            !!budgetLimit &&
            !isNaN(budgetLimit) &&
            budgetLimit > 0 &&
            budgetLimit <= Number.MAX_VALUE
        )
    }

    /**
     * Validador do campo outros
     * @param {*} outros
     * @return Boolean
     */
    static validOutros(outros) {
        return !outros || (!!outros && outros.length <= 200)
    }

    /**
     * Validação do registro inicial do usuário, obrigando a preencher corretamente
     * password, name, lastName e email. Demais campos são opcionais (address, civilStatus, cpf e cnpj)
     */
    static validUserRegister(
        cpf,
        password,
        name,
        email,
        lastName,
        address,
        civilStatus,
        cnpj,
        checkPassword = true,
        checkEmail = true
    ) {
        let message

        //campos obrigatórios
        if (checkPassword && !ValidationHelper.validPassword(password))
            message = constants.invalidPassword
        else if (!ValidationHelper.validName(name))
            message = constants.invalidName
        else if (!ValidationHelper.validLastName(lastName))
            message = constants.invalidFullName
        else if (checkEmail && !ValidationHelper.validEmail(email))
            message = constants.invalidEmail
        //campos opcionais para o cadastro inicial, caso venha preenchido faz a validação.
        else if (!!cpf && !ValidationHelper.validCPF(cpf))
            message = constants.invalidCpf
        else if (!!cnpj && !ValidationHelper.validCNPJ(cnpj))
            message = constants.invalidCnpj
        else if (
            !!civilStatus &&
            !ValidationHelper.validCivilStatus(civilStatus)
        )
            message = constants.invalidCivilStatus
        //campos opcionais endereço, valida caso venha preenchido.
        else if (!!address) {
            if (
                !!address.street &&
                !ValidationHelper.validStreet(address.street)
            )
                message = constants.invalidStreet
            else if (
                !!address.number &&
                !ValidationHelper.validNumber(address.number)
            )
                message = constants.invalidNumber
            else if (
                !!address.cep &&
                !ValidationHelper.validNumber(address.cep)
            )
                message = constants.invalidCEP
            else if (
                !!address.complement &&
                !ValidationHelper.validComplement(address.complement)
            )
                message = constants.invalidComplement
            else if (
                !!address.neighborhood &&
                !ValidationHelper.validNeighborhood(address.neighborhood)
            )
                message = constants.invalidNeighborhood
            else if (
                !!address.city &&
                !ValidationHelper.validCity(address.city)
            )
                message = constants.invalidCity
            else if (!!address.uf && !ValidationHelper.validUF(address.uf))
                message = constants.invalidUF
        }

        return {
            valid: !message,
            message
        }
    }

    static validReformRegister(
        userId,
        establishmentName,
        establishmentType,
        status,
        area,
        address,
        goal,
        restrictions,
        budgetLimit,
        reformItens,
        phone
    ) {
        let message

        if (!userId) message = constants.userIdNotFound
        else if (!ValidationHelper.validEstablishmentName(establishmentName))
            message = constants.invalidPlaceName
        else if (!ValidationHelper.validEstablishmentType(establishmentType))
            message = constants.invalidEstablishment
        else if (!ValidationHelper.validReformStatus(status))
            message = constants.invalidReformStatus
        else if (!ValidationHelper.validArea(area))
            message = constants.invalidArea
        else if (!ValidationHelper.validGoal(goal))
            message = constants.invalidGoal
        else if (!ValidationHelper.validRestrictions(restrictions))
            message = constants.invalidRestrictions
        else if (!ValidationHelper.validBudgetLimit(budgetLimit))
            message = constants.invalidBudgetLimit
        else if (!ValidationHelper.validPhone(phone))
            message = constants.invalidPhone
        else if (!reformItens) message = constants.invalidReformItens
        else if (
            !reformItens ||
            !ValidationHelper.validOutros(reformItens.outros)
        )
            message = constants.invalidOutros
        else if (!address) {
            message = constants.invalidAddress
        } else {
            if (
                !!address.street &&
                !ValidationHelper.validStreet(address.street)
            )
                message = constants.invalidStreet
            else if (
                !!address.number &&
                !ValidationHelper.validNumber(address.number)
            )
                message = constants.invalidNumber
            else if (!!address.cep && !ValidationHelper.validCep(address.cep))
                message = constants.invalidCEP
            else if (
                !!address.complement &&
                !ValidationHelper.validComplement(address.complement)
            )
                message = constants.invalidComplement
            else if (
                !!address.neighborhood &&
                !ValidationHelper.validNeighborhood(address.neighborhood)
            )
                message = constants.invalidNeighborhood
            else if (
                !!address.city &&
                !ValidationHelper.validCity(address.city)
            )
                message = constants.invalidCity
            else if (!!address.uf && !ValidationHelper.validUF(address.uf))
                message = constants.invalidUF
        }

        return {
            valid: !message,
            message
        }
    }
}

module.exports = ValidationHelper
