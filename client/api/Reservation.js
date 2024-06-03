import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    baseURL: `${API_HOST}/api/`

    // baseURL: `${API_HOST}:8080/api/`
})

export const getReservation = async (params) => {
    try {
        const response = await api.post("user/getReservations", { params })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export const createReservation = async (userId, ResidencyId, tripInfo, price, startDate, endDate) => {
    try {
        const response = await api.post('user/createReservation', { userId, ResidencyId, tripInfo, price, startDate, endDate })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const getDetailsReservation = async (reservationID) => {
    try {
        const result = await api.post(`user/getDetailsReservation`, { reservationID })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        throw error
    }
}
export const deleteReservation = async (id) => {
    try {
        const response = await api.delete(`user/deleteReservations/${id}`)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateReservation = async (id) => {
    try {
        const response = await api.patch('user/updateReservation', { id })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const GetEarning = async (month, year, userEmail) => {
    try {
        const result = await api.post(`user/getEarnings`, { month, year, userEmail })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        throw error
    }
}
export const GetEarningWithYear = async (year, userEmail) => {
    try {
        const result = await api.post(`user/getEarningsWithYear`, { year, userEmail })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        throw error
    }
}