import $api from "../http";

export default class AdminService {

    static async getAdvertisementsForModeration(limit, page, sortBy) {
        return await $api.get(`/v1/admin/advertisements?_limit=${limit}&_page=${page}&_sortBy=${sortBy}`)
    }

    static async changeUserStatus(email, status) {
        return await $api.patch(`/v1/admin/users?_email=${email}&_status=${status}`)
    }

    static async changeAdvertisementStatus(id, status) {
        return await $api.patch(`/v1/admin/advertisements?_id=${id}&_status=${status}`)
    }

    static async getFeedbacks(limit, page, sortBy) {
        return await $api.get(`/v1/feedback?_limit=${limit}&_page=${page}&_sortBy=${sortBy}`)
    }
}