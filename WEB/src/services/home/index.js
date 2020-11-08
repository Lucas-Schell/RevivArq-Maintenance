import axios from 'axios'
import { Constants } from 'configs/constants'
import { EditTexts, GetTexts } from 'configs/api_routes'

export const getTexts = async () => {
    let session = sessionStorage.getItem('token')
    console.log(session)
    const response = await axios({
        method: GetTexts.method,
        url: GetTexts.url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session === null ? '' : session}`
        }
    })

    if (response) {
        return response.data.data
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}

export const editTexts = async (texts) => {
    const response = await axios({
        method: EditTexts.method,
        url: EditTexts.url,
        timeout: 5000,
        data: texts,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if (response) {
        return response.data
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}
