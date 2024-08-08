import axios from "axios"

const ESP32_IP_ADDRESS = process.env.NEXT_PUBLIC_ESP32_IP_ADDRESS


const useApiCall = () => {
    const get = async (url) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const response = await axios.get(`http://${ESP32_IP_ADDRESS}/${url}`, config)
        return { data: response.data, status: response.status }
        } catch (error) {
            console.error(error)
            return { data: null, status: 500 }
        }
    }
    const switchRelay = async (relay, value) => {
        console.log(`http://${ESP32_IP_ADDRESS}/${relay}/${value}`)
        try {
            const response = await axios.get(`http://${ESP32_IP_ADDRESS}/${relay}/${value}`)
            return { data: response.data, status: response.status }
        } catch (error) {
            console.error(error)
            return { data: null, status: 500 }
        }
    }
    
    return { 
        get,
        switchRelay
    }
}

export default useApiCall