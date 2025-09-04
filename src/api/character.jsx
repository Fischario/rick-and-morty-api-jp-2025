import api from "./api"

export const getCharacters = async (params) => {
    const response = await api.get('/character', { params })

    if (response.status != 200) {
        throw new Error(response.status)
    }

    // console.log(response.data)

    return response.data.results
}
