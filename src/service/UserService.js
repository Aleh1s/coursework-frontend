import $api from "../http";

export default class UserService {

    static async checkImage(email) {
        return await $api.get(`/v1/users/image/check?_email=${email}`)
    }

    static async addImage(formData) {
        return await $api.post(`/v1/users`, formData)
    }

}