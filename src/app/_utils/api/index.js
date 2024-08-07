import axios from "axios"

const ESP32_IP_ADDRESS = process.env

const useApiCall = () => {
    const get = async (url) => {
        try {
            const response = await axios.get(`http://${ESP32_IP_ADDRESS}/${url}`)
        return { data: response.data, status: response.status }
        } catch (error) {
            console.error(error)
            return { data: null, status: 500 }
        }
    }
    
    return { get }
}

export default useApiCall

export const switchRelay = async (relay, value) => {
    try {
        const response = await axios.get(`http://${ESP32_IP_ADDRESS}/${relay}/${value}`)
        return { data: response.data, status: response.status }
    } catch (error) {
        console.error(error)
        return { data: null, status: 500 }
    }
}