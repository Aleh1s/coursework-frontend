import $api from "../http";

export default class AuthService {
    static async authenticate(authData) {
        return $api.post('/v1/authentication/authenticate', authData)
    }

    static async register(regData) {
        return $api.post('/v1/registration/register', regData)
    }
}