import axios from 'axios'
import { Constants } from 'configs/constants';
// import * as querystring from 'querystring'

import { instagramGaleria } from 'configs/api_routes'

export const get = async() => {

    let route = instagramGaleria;
    console.log("ROUTE",route)
    const response = await axios({
        method: 'get',
        url: route.url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response) {
        const api_response = response.data
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}