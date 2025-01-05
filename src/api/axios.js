import axios from 'axios'
import Config from 'react-native-config'

const apiInstance = axios.create({
    baseURL: Config.BASE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})


apiInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return error
    }
)

export default apiInstance