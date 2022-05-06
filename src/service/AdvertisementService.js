import $api, {API_URL} from "../http";
import axios from "axios";

export default class AdvertisementService {

    static async createAdvertisement(advertisementData) {
        return await $api.post('/v1/advertisements', advertisementData)
    }

    static async getPageOfSortedAdvertisements(page, limit, category, status) {
        return await axios.get(`${API_URL}/v1/advertisements/page/${category}?_limit=${limit}&_page=${page}&_status=${status}`)
    }
}