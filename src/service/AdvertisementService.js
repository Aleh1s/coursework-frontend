import $api, {API_URL} from "../http";
import axios from "axios";

export default class AdvertisementService {

    static async createAdvertisement(formData) {
        return await $api.post(`/v1/advertisements`, formData)
    }

    static async getAdvertisementDetails(id) {
        return await axios.get(`${API_URL}/v1/advertisements?_id=${id}`)
    }

    static async getPageOfSortedAdvertisements(page, limit, category, sortBy) {
        return await axios.get(`${API_URL}/v1/advertisements/page?_category=${category}&_limit=${limit}&_page=${page}&_sortBy=${sortBy}`)
    }

    static async getAdvertisementByEmail() {
        return await $api.get('/v1/advertisements/email')
    }

    static async getAdvertisementByQuery(query, page, limit, category, sortBy) {
        return await axios.get(`${API_URL}/v1/advertisements/query?_limit=${limit}&_page=${page}&_sortBy=${sortBy}&_category=${category}&_query=${query}`)
    }

    static async removeAdvertisementById(id) {
        return await $api.delete(`/v1/advertisements?_id=${id}`)
    }
}