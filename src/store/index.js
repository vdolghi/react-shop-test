import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './product';
import cartSlice from './cart';

const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
    },
});

export default store;
