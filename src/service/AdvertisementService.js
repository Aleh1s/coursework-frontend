import $api, {API_URL} from "../http";
import axios from "axios";

export default class AdvertisementService {

    static async createAdvertisement(creationData) {
        return await $api.post(`/v1/advertisements`, creationData)
    }

    static async getAdvertisementDetails(id) {
        return await axios.get(`${API_URL}/v1/advertisements/${id}`)
    }

    static async getAll(page, limit, category, sortBy, query) {
        return await axios.get(`${API_URL}/v1/advertisements?_category=${category}&_limit=${limit}&_page=${page}&_sortBy=${sortBy}&_query=${query}`)
    }

    static async getAdvertisementsByEmail(email, limit, sortBy, page) {
        return await $api.get(`/v1/users/advertisements?_email=${email}&_limit=${limit}&_page=${page}&_sortBy=${sortBy}`)
    }

    static async removeAdvertisementById(id) {
        return await $api.delete(`/v1/advertisements?_id=${id}`)
    }

    static async updateAdvertisement(data) {
        return await $api.patch(`/v1/advertisements`, data)
    }
}