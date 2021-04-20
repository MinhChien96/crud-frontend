import axios from 'axios';
import { API } from 'Config';

const axiosClient = axios.create({
    baseURL: API,
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
