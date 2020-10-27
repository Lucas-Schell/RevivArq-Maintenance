import axios from 'axios'
import * as crypto from 'crypto-js'
import { Constants } from 'configs/constants'

import {
    api_login,
    api_verify_token,
    PostGeneratePassCode,
    PostSendNewPassword
} from 'configs/api_routes'

export const login = async (email, password, encrypt_password) => {
    const route = api_login()

    const params = {
        email: email,
        password: encrypt_password
            ? crypto.SHA256(password).toString()
            : password
    }

    const response = await axios({
        method: route.method,
        url: route.url,
        data: params,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response) {
        let token
        let isAdmin
        let id
        const api_response = response.data
        const responseData = api_response.data

        if (responseData) {
            token = api_response.data.token
            isAdmin = api_response.data.userData.isAdmin
            id = api_response.data.userData.id
        }

        if (token) {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('username', params.username)
            sessionStorage.setItem('password', params.password)
            sessionStorage.setItem('isAdmin', isAdmin)
            sessionStorage.setItem('id', id)
            sessionStorage.setItem(
                'user',
                api_response.data.userData.name +
                    ' ' +
                    api_response.data.userData.lastName
            )
        }
        return api_response
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}

export const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.setItem('isAdmin', false)
}

export const validToken = async () => {
    const route = api_verify_token()
    const token = sessionStorage.getItem('token')

    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Passando o token de autorização
        }
    })

    if (response) {
        const responseData = response.data
        return responseData.data
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}

export const genPassCode = async (data) => {
    let route = PostGeneratePassCode
    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        data: data,
        headers: {
            'Content-Type':
                'application/json; boundary=--------------------------827565669435541058886760'
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

export const genNewPassword = async (data) => {
    let route = PostSendNewPassword
    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        data: data,
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
