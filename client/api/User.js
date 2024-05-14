import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    baseURL: `https://olyvillas-mobile.onrender.com/api/`
})

export const verifyEmail = async (email) => {
    console.log(email)
    try {
        const response = await api.post("user/verifyEmail", { email: email })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }

        return response.data

    } catch (error) {
        throw error
    }
}
export const createUser = async (email, password, firstName, lastName) => {
    try {
        const response = await api.post(`user/register`, { email, password, firstName, lastName })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const login = async (email, password) => {
    try {
        const result = await api.post(`user/login`, { email, password })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data.user
    } catch (error) {
        throw error
    }
}