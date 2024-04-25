import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    baseURL: `${API_HOST}:8080/api/`
})

export const getAllProperties = async (params = {}) => {

    try {
        const response = await api.post("user/getResidencies", params)
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
