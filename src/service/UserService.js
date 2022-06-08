import $api from "../http";

export default class UserService {
    static async update(updateData) {
        return await $api.patch('/v1/users', updateData)
    }

}