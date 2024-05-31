import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    // baseURL: `https://olyvillas-mobile.onrender.com/api/`
    baseURL: `${API_HOST}:8080/api/`
})

export const getAllProperties = async (params = {}, page = 1) => {

    try {
        const response = await api.post(`user/getResidencies?page=${page}`, params)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllResidencies_withAuthorEmail = async (params = {}) => {

    try {
        const response = await api.post("user/getResidencies_withAuthorEmail", params)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getAllResidencies_forMap = async () => {

    try {
        const response = await api.post("user/getAllResidencies_forMap")
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getResidency = async (id) => {
    try {
        const response = await api.get(`user/getResidency/${id}`)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const FavouritesResidency = async (ResidencyId, email) => {
    try {
        const result = await api.post(`user/toFav/${ResidencyId}`, { email })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        throw error
    }
}

export const createResidency = async (data) => {
    console.log(data.locationType)
    try {
        const response = await api.post("user/createResidency", { data })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const DeleteResidency = async (ResidencyId) => {
    try {
        const result = await api.delete(`user/deleteResidency/${ResidencyId}`)
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        throw error
    }
}