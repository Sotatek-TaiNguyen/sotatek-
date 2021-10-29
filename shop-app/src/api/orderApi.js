import axiosClient from "./axiosClient";
const orderApi = {
    getAll: (params) => {
        const url = '/orders';
        return axiosClient.get(url, { params });
    },
    getByOrderUserId: (id) => {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },
    createOrder: (data) => {
        const url = `/orders/`;
        return axiosClient.post(url, data);
    },
    cancelOrder: (id) => {
        const url = `/orders/${id}/cancel`;
        return axiosClient.put(url);
    }

}
export default orderApi;