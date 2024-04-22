import axios from 'axios'
export const api = axios.create({
    baseURL: "http://26.65.38.219:8080/api/"
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