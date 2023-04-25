import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addInCart: (state, action) => {
            //const item = state.products.find(item => item.sku === action.payload.sku);
            /* if (item) {
                item.qty += 1;
            } else { */
            state.products.push(action.payload);
            //}
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.sku !== action.payload);
        },
        resetCart: (state, action) => {
            state.products = [];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addInCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer