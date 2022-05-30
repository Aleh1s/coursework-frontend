import axios from "axios";
import AuthService from "../service/AuthService";

export const API_URL = 'http://localhost:8080/api'

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken')
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 403 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        AuthService.refresh()
            .then(response => {
                localStorage.setItem('accessToken', `Bearer_${response.data.token}`)
                return $api.request(originalRequest)
            })
            .catch(err => console.log("User is not authorized"))
    }
    throw error
})

export default $api;