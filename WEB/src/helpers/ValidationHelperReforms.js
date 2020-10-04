export function validReformStatus(reformStatus) {
    return (
        this.ReformStatusEnum.REQUESTED_BUDGET === reformStatus ||
        this.ReformStatusEnum.IN_PROGRESS === reformStatus ||
        this.ReformStatusEnum.STOPPED === reformStatus ||
        this.ReformStatusEnum.APPROVED === reformStatus
    );
}

/**
 * Enum Status da reforma
 */
export function getReformStatusEnum() {
    return {
        REQUESTED_BUDGET: "Orçamento Solicitado",
        IN_PROGRESS: "Em Andamento",
        STOPPED: "Parado",
        APPROVED: "Aprovado"
    };
}

/**
 * Validador de status da reforma
 * @param {*} civilStatus
 * @return Boolean
 */

export function UFs() {
    return [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
    ];
}

export function validStreet(street) {
    return !!street && street.length > 0 && street.length <= 50;
}

/**
 * Validador de cep
 * @param {*} cep
 * @return Boolean
 */
export function validCep(cep) {
    return !!cep && cep.length === 8;
}

export function validNumber(number) {
    return !!number && number > 0;
}

/**
 * Validador de complemento (endereço)
 * @param {*} complement
 * @return Boolean
 */
export function validComplement(complement) {
    return !!complement && complement.length > 0 && complement.length <= 50;
}
export function validNeighborhood(neighborhood) {
    return (
        !!neighborhood && neighborhood.length > 0 && neighborhood.length <= 40
    );
}

/**
 * Validador de cidade (endereço)
 * @param {*} neighborhood
 * @return Boolean
 */
export function validCity(city) {
    return !!city && city.length > 0 && city.length <= 40;
}

/**
 * Validador de UF
 * @param {*} UF
 * @return Boolean
 */
export function validUF(uf) {
    return !!uf && this.UFs.includes(uf);
}

/**
 * Validador de tipo de estabelecimento
 * @param {*} establishmentType
 * @return Boolean
 */
export function validEstablishmentType(establishmentType) {
    return (
        !!establishmentType &&
        establishmentType.length > 0 &&
        establishmentType.length <= 50
    );
}

/**
 * Validador de nome de estabelecimento
 * @param {*} establishmentName
 * @return Boolean
 */
export function validEstablishmentName(establishmentName) {
    return (
        !!establishmentName &&
        establishmentName.length > 0 &&
        establishmentName.length <= 60
    );
}

/**
 * Validador de área do estabelecimento
 * @param {*} area
 * @return Boolean
 */
export function validArea(area) {
    return !!area && !isNaN(area) && area > 0 && area <= 999999;
}
