import axiosClient from "./axiosClient";
const userApi = {
    login: (data) => {
        const url = '/users/login';
        return axiosClient.post(url, data);
    },

}
export default userApi;