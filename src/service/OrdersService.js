import $api from "../http";

export default class OrdersService{
    static async getAllByEmail() {
        return await $api.get('/v1/orders/email') //http://localhost:8080/api/v1/advertisements/email
    }

    static async makeOrder(orderData) {
        return await $api.post('/v1/orders', orderData)
    }

    static async getOrderDetailsModel(id) {
        return await $api.get(`/v1/orders?_id=${id}`)
    }

    static async cancelOrder(id) {
        return await $api.put(`/v1/orders/cancel?_id=${id}`)
    }

    static async changeDeliveryStatus(id, status) {
        return await $api.put(`/v1/orders/change-status?_id=${id}&_status=${status}`)
    }

    static async getAllByAdvertisementId(id) {
        return await $api.get(`/v1/orders/advertisement?_id=${id}`)
    }
}