import AxiosClient from './AxiosClient';

const productService = {
	getAll: (params) => {
		return AxiosClient.get('/products', { params });
	},

	getById: (id) => {
		return AxiosClient.get(`/products/${id}`);
	},

	create: (params) => {
		return AxiosClient.post(`/products`, params);
	},

	update: (params) => {
		const { id, ...ortherParams } = params;
		return AxiosClient.put(`/products/${id}`, ortherParams);
	},

	deleteById: (id) => {
		return AxiosClient.delete(`/products/${id}`);
	},
};

export default productService;
