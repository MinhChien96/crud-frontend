import AxiosClient from './AxiosClient';

const productService = {
    getAll: (params) => {
        return AxiosClient.get('/products', { params });
    },

    getById: (id) => {
        return AxiosClient.get(`/products/${id}`);
    },
};

export default productService;
