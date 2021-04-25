import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from 'Services/Product';
import { PAGE_SIZE_DEFAULT } from 'Config';

export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	async (id, thunkAPI) => {
		const response = await productService.deleteById(id);
		return response;
	}
);

export const fetchProduct = createAsyncThunk(
	'product/fetchProduct',
	async (params, thunkAPI) => {
		const response = await productService.getAll({
			...params,
		});
		return response;
	}
);

const defaultPaging = {
	page: 0,
	pageSize: PAGE_SIZE_DEFAULT,
};

const ProductSlice = createSlice({
	name: 'product',
	initialState: {
		list: [],
		totalCount: 0,
		paging: defaultPaging,
		loadingTable: false,
		isShowForm: false,
		formAction: '',
		refreshData: false,
		idProductEdit: '',
	},
	reducers: {
		setProduct(state, action) {
			state.list = action.payload;
		},
		changePaging(state, action) {
			state.paging = action.payload;
		},
		showForm(state, action) {
			state.isShowForm = true;
			state.formAction = action.payload.action;
			state.idProductEdit = action.payload.id || '';
		},
		closeForm(state, action) {
			console.log(action);
			state.isShowForm = false;
			state.formAction = '';
			state.refreshData = action.payload || false;
		},
		reset(state, action) {
			state.list = [];
			state.paging = defaultPaging;
			state.loadingTable = false;
			state.loadingForm = false;
		},
	},
	extraReducers: {
		[fetchProduct.pending]: (state, action) => {
			if (state.loadingTable === false) {
				state.loadingTable = true;
			}
		},
		[fetchProduct.fulfilled]: (state, action) => {
			if (state.loadingTable === true) {
				state.loadingTable = false;
			}
			state.list = action.payload.data;
			state.totalCount = action.payload.totalCount;
		},
		[fetchProduct.rejected]: (state, action) => {
			if (state.loadingTable === true) {
				state.loadingTable = false;
			}
		},
	},
});

export const {
	setProduct,
	reset,
	changePaging,
	showForm,
	closeForm,
} = ProductSlice.actions;

export default ProductSlice.reducer;
