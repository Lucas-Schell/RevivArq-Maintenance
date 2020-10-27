import axios from 'axios'
import * as crypto from 'crypto-js'
import { api_auth_user, api_get_user, crud_user } from 'configs/api_routes'
import { Constants } from 'configs/constants'
import * as querystring from 'query-string'

export const create = async (user, encryptPassword) => {
    let route = crud_user.create()

    const params = {
        ...user,
        password: encryptPassword
            ? crypto.SHA256(user.password).toString()
            : user.password
    }
    const response = await axios({
        method: route.method,
        url: route.url,
        data: params,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    console.log(response)
    if (response) {
        let api_response = response.data
        if (api_response && api_response.statusCode === Constants.successCode) {
            let token
            api_response = response.data
            const responseData = api_response.data
            let id
            if (responseData) {
                token = api_response.data.token
                id = api_response.data.userData.id
            }

            if (token) {
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('email', params.email)
                sessionStorage.setItem('password', params.password)
                sessionStorage.setItem('isAdmin', false)
                sessionStorage.setItem('id', id)
                sessionStorage.setItem(
                    'user',
                    api_response.data.userData.name +
                        ' ' +
                        api_response.data.userData.lastName
                )
                return api_response
            }

            return api_response
        } else if (
            api_response &&
            api_response.statusCode !== Constants.successCode
        ) {
            return api_response
        } else {
            return {
                statusDesc: 'Erro obtendo resposta do servidor.',
                statusCode: Constants.InternalServerError
            }
        }
    }
}

export const read = async (id) => {
    let route = crud_user.read(id)

    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if (response) {
        const api_response = response.data
        return api_response.data
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}

export const loggedUser = async () => {
    let route = api_auth_user

    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if (response) {
        const api_response = response.data
        return api_response.data
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}

export const update = async (user) => {
    let route = crud_user.update()

    const response = await axios({
        method: route.method,
        url: route.url,
        data: user,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })

    if (response) {
        const api_response = response.data
        if (api_response.data) {
            return response.data
        } else {
            return {
                statusDesc: 'Erro obtendo resposta do servidor.',
                statusCode: Constants.InternalServerError
            }
        }
    }
}

export const list = async (contains, sort, isAscending) => {
    const queryParams = querystring.stringify({
        contains: contains,
        sort: sort,
        isAscending: isAscending
    })

    let route = crud_user.list()

    const response = await axios({
        method: route.method,
        url: `${route.url}?${queryParams}`,
        timeout: 5000,
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

export const getUser = async (id) => {
    let route = api_get_user

    const response = await axios({
        method: route.method,
        url: route.url,
        timeout: 5000,
        params: { id },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    if (response) {
        const api_response = response.data
        return api_response.data
    } else {
        return {
            statusDesc: 'Erro obtendo resposta do servidor.',
            statusCode: Constants.InternalServerError
        }
    }
}
