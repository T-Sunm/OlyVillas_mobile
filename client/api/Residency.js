import axios from 'axios'
import { API_HOST } from '../environment'
export const api = axios.create({
    baseURL: `${API_HOST}/api/`
    // baseURL: `${API_HOST}:8080/api/`
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

export const deleteImageResy = async(ResidencyId,idImage)=>{
    try {
        const body = {idImage}
        const result = await api.delete(`/updateResidency/${ResidencyId}/deleteImages`,{ data: body })
        if (result.status === 401 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        throw error
    }
}

export const updateImageResy = async(ResidencyId,photo)=>{
    try {
        const body = {photo}
        const result = await api.put(`/updateResidency/${ResidencyId}/createImages`, {photo: photo})
        if (result.status === 404 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        console.log(error.response)
        throw error
    }
}

export const updateResidency = async (ResidencyId, data) => {
    try {
        const response = await api.put(`user/updateResidency/${ResidencyId}`, { data })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}