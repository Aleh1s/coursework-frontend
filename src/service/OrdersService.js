import $api from "../http";

export default class OrdersService{
    static async getAllByUserEmail(email, limit, page, sortBy) {
        return await $api.get(`/v1/orders/users/${email}?_limit=${limit}&_page=${page}&_sortBy=${sortBy}`)
    }

    static async makeOrder(orderData) {
        return await $api.post('/v1/orders', orderData)
    }

    static async cancelOrder(id) {
        return await $api.patch(`/v1/orders/cancel?_id=${id}`)
    }

    static async changeDeliveryStatus(id, status) {
        return await $api.patch(`/v1/orders/change-status?_id=${id}&_status=${status}`)
    }

    static async getAllByAdvertisementId(id) {
        return await $api.get(`/v1/orders/advertisements/${id}`)
    }

    static async confirmOrder(id) {
        return await $api.patch(`/v1/orders/accept?_id=${id}`)
    }

    static async declineOrder(id) {
        return await $api.patch(`/v1/orders/decline?_id=${id}`)
    }
}