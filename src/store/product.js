import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import products from '../data/products.json';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        // if you get the data from an API, here is where you call the fetch API
        // in this case, we're just returning local data
        return products;
    }
);

export const fetchVouchers = createAsyncThunk(
    'products/fetchVouchers',
    async () => {
        // N-am inteles de ce trebuie facut fetch separat pentru vouchere; eu am implementat putin diferit
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: null
    },
    reducers: {

    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
        state.status = "pending";
        },
        [fetchProducts.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = "success";
        },
        [fetchProducts.rejected]: (state, action) => {
        state.status = "rejected";
        },
    },
});

export default productsSlice.reducer;
