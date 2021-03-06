import $api, {API_URL} from "../http";
import axios from "axios";

export default class AuthService {
    static async authenticate(authData) {
        return axios.post(`${API_URL}/v1/authentication/authenticate`, authData)
    }

    static async register(regData) {
        return axios.post(`${API_URL}/v1/registration/register`, regData)
    }

    static async refresh() {
        return axios.get(`${API_URL}/v1/authentication/refresh`,{
            headers: {
                'Authorization': localStorage.getItem("refreshToken")
            }
        })
    }
}