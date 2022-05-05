import axios from "axios";

export const API_URL = 'http://localhost:8080/api'

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer_${localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''}`
    return config;
})

export default $api;