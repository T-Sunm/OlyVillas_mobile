import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    // baseURL: `https://olyvillas-mobile.onrender.com/api/`
    baseURL: `${API_HOST}:8080/api/`
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

export const EditUserInfo = async (email, firstName, lastName) => {
    try {
        const result = await api.post(`user/editUserInfo`, { email, firstName, lastName })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        console.log("Something went wrong in EditUserInfo , Please try again")
        throw error
    }
}

export const EditEmail = async (newEmail, oldEmail) => {
    try {
        const result = await api.post(`user/editEmail`, { newEmail, oldEmail })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        console.log("Something went wrong in EditEmail , Please try again")
        throw error
    }
}

export const editPassword = async (email, oldPassword, newPassword) => {
    try {
        const result = await api.post('user/editPassword', { email, oldPassword, newPassword })
        if (result.status === 401 || result.status === 400 || result.status === 500 || result.status === 404) {
            throw result.data
        }
        return result.data
    } catch (error) {
        if (error.response.data.message) {
            console.log(error.response.data.message)
        } else {
            console.log("Something went wrong in editPassword , Please try again")
        }
        throw error
    }
}