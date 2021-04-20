import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from 'Services/Product';

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (params, thunkAPI) => {
        const ListProduct = await productService.getAll(params);
        return ListProduct;
    }
);

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
    },
    reducers: {
        setProduct(state, action) {
            state.list = action.payload;
        },
    },
    extraReducers: {
        [fetchProduct.fulfilled]: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
