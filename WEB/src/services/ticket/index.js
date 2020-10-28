import axios from 'axios'
import { Constants } from 'configs/constants'
import { PostTicket } from 'configs/api_routes'

export const postTicket = async (ticket) => {
    const response = await axios({
        method: 'post',
        url: PostTicket.url,
        timeout: 5000,
        data: ticket,
        headers: {
            'Content-Type': 'application/json'
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
