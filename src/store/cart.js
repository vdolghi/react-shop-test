import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
    },
    reducers: {
        addProductToCart: (state, action) => {
            // if index > 0, product already exists in cart
            const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (index < 0) {
              let newProduct = { ...action.payload, cartQuantity: 1 };
              state.cartItems.push(newProduct);
              console.log("Added new product: " + action.payload.id);
            } else {
                state.cartItems[index] = {
                    ...state.cartItems[index],
                    cartQuantity: state.cartItems[index].cartQuantity + 1,
                };
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        incrementProductInCart: (state, action) => {
            const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cartItems[index] = {
                    ...state.cartItems[index],
                    cartQuantity: state.cartItems[index].cartQuantity + 1,
                };
                console.log("Incremented quantity of product: " + action.payload.id);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decrementProductInCart: (state, action) => {
            const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (index >= 0 && state.cartItems[index].cartQuantity > 1) {
                state.cartItems[index] = {
                    ...state.cartItems[index],
                    cartQuantity: state.cartItems[index].cartQuantity - 1,
                };
                console.log("Decremented quantity of product: " + action.payload.id);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeProductFromCart: (state, action) => {
            state.cartItems.map((cartItem) => {
              if (cartItem.id === action.payload.id) {
                const nextCartItems = state.cartItems.filter((item) => item.id !== cartItem.id);                
                state.cartItems = nextCartItems;
                console.log("Product removed from cart: " + action.payload.id);
              }
              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
              return state;
            });
        },

        updateQuantity: (state, action) => {
            const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cartItems[index] = {
                    ...state.cartItems[index],
                    cartQuantity: action.payload.quantity,
                };
                console.log("Changed quantity of product: " + action.payload.id);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        resetCart: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        applyVoucher: (state, action) => {
            const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                const voucherIndex = state.cartItems[index].vouchers.findIndex((item) => item.name === action.payload.voucherCode);
                if (voucherIndex >= 0) {
                    state.cartItems[index].vouchers[voucherIndex] = {
                        ...state.cartItems[index].vouchers[voucherIndex],
                        applied: true,
                    };
                    state.cartItems[index] = {
                        ...state.cartItems[index],
                        newPrice: parseFloat((state.cartItems[index].price * state.cartItems[index].vouchers[voucherIndex].discount / 100).toFixed(2)), 
                    };

                }
            }
        },
        productsPurchased: (state, action) => {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                  const { price, cartQuantity, newPrice } = cartItem;
                  const itemTotal = (newPrice ? newPrice: price) * cartQuantity;
        
                  cartTotal.total += itemTotal;
                  cartTotal.quantity += cartQuantity;
        
                  return cartTotal;
                },
                {
                  total: 0,
                  quantity: 0,
                }
              );
              total = parseFloat(total.toFixed(2));
              state.cartTotalQuantity = quantity;
              state.cartTotalAmount = total;
              localStorage.setItem("cartTotalQuantity", JSON.stringify(state.cartTotalQuantity));
              localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
            },
    },
});

export const {
    addProductToCart,
    removeProductFromCart,
    incrementProductInCart,
    decrementProductInCart,
    updateQuantity,
    resetCart,
    applyVoucher,
    productsPurchased,
} = cartSlice.actions;

export default cartSlice.reducer;
