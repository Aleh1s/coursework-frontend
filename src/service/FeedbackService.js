import axios from "axios";
import $api, {API_URL} from "../http";

export default class FeedbackService {
    static async create(data) {
            return await axios.post(`${API_URL}/v1/feedback`, data)
    }

    static async get() {
        return await $api.get('/v1/feedback')
    }
}