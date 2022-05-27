import $api from "../http";

export default class ImageService {
    static async userProfileImageExists(email) {
        return await $api.get(`/v1/images/users/exists?_email=${email}`)
    }

    static async addUserProfileImage(image) {
        return await $api.post(`/v1/images/users`, image)
    }
}