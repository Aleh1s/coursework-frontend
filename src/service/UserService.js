import $api from "../http";

export default class UserService {
    static async update(updateData) {
        return await $api.put('/v1/users', updateData)
    }

}