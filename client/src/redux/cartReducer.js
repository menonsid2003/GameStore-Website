import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addInCart: (state, action) => {
            const item = state.products.find(item => item.sku === action.payload.sku);
            if (item) {
                item.qty += 1;
            } else {
                state.products.push(action.payload);
            }
        },
        remove1: (state, action) => {
            const item = state.products.find(item => item.sku === action.payload);
            item.qty -= 1;
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.sku !== action.payload);
        },
        resetCart: (state) => {
            state.products = [];
        },
    },
})

// export { qty };
// Action creators are generated for each case reducer function
export const { addInCart, removeItem, resetCart, remove1 } = cartSlice.actions

export default cartSlice.reducer