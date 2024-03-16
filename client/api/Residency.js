import axios from 'axios'
export const api = axios.create({
    baseURL: "http://26.65.38.219:8080/api/"
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