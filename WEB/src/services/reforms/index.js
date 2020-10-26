import axios from 'axios'
import { Constants } from 'configs/constants'
import { GetReforms, PostReform, UpdateReforms } from 'configs/api_routes'

export const getReforms = async (user) => {
    const response = await axios({
        method: 'get',
        url: GetReforms.url,
        timeout: 5000,
        data: user,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await sessionStorage.getItem('token')}`
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

export const editReform = async (reform) => {
    let route = UpdateReforms
    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        data: reform,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await sessionStorage.getItem('token')}`
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

/* export const postPhotos = async (file) =>{

    let route = PostPhotos;

    const response = await axios({
        method: 'post',
        url: route.url,
        timeout: 5000,
        data:reform,
        body: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await sessionStorage.getItem("file")}`
        }
    })

    if (response) {
        const api_response = response.data
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }

} */

export const postReform = async (reform) => {
    reform.userId = await sessionStorage.getItem('id')

    const response = await axios({
        method: 'post',
        url: PostReform.url,
        timeout: 5000,
        data: reform,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await sessionStorage.getItem('token')}`
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
