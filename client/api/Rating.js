import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    baseURL: `${API_HOST}/api/`
    // baseURL: `${API_HOST}:8080/api/`
})

export const getRatingByResidency = async (ResidencyId) => {
    try {
        const response = await api.get("user/getRatingByResidency", {
            params: { ResidencyId }
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createRating = async (data) => {
    try {
        const result = await api.post('user/createRating', { data })
    } catch (error) {
        console.log(error)
        throw error
    }
}