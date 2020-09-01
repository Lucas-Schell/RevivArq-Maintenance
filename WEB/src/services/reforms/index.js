import axios from 'axios'
import { Constants } from 'configs/constants';
import { api_get_reforms, UpdateReforms } from 'configs/api_routes'
import { GetReforms  } from 'configs/api_routes'
import { PostReform } from 'configs/api_routes'

export const getReforms = async (user) => {

    let route = GetReforms;
    const response = await axios({
        method: 'get',
        url: route.url,
        timeout: 5000,
        data:user,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await sessionStorage.getItem("token")}`
        }
    })

    if (response) {
        const api_response = response.data.data
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}

export const editReform = async (reform) => {

    let route = UpdateReforms;
    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        data:reform,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await sessionStorage.getItem("token")}`
        }
    })

    if (response) {
        const api_response = response.data
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
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

    let userID = await sessionStorage.getItem("id");

    reform.userId = userID;

    let route = PostReform;
    
    const response = await axios({
        method: 'post',
        url: route.url,
        timeout: 5000,
        data:reform,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await sessionStorage.getItem("token")}`
        }
    })

    if (response) {
        const api_response = response.data
        return api_response
    } else {
        return { statusDesc: 'Erro obtendo resposta do servidor.', statusCode: Constants.InternalServerError }
    }
}

