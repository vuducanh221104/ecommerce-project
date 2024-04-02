import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0,
    },
    reducers: {
        incrementQuantity: (state) => {
            state.quantity += 1;
        },

        decreaseQuantity: (state) => {
            if (state.quantity > 0) {
                state.quantity -= 1;
            }
        },

        deleteQuantity: (state, action) => {
            // Giả sử action.payload là số lượng sản phẩm cần xóa
            if (action.payload >= state.quantity) {
                // Nếu số lượng cần xóa lớn hơn hoặc bằng số lượng hiện tại, set quantity về 0
                state.quantity = 0;
            } else {
                // Ngược lại, giảm số lượng đi action.payload
                state.quantity -= action.payload;
            }
        },
    },
});

export const { incrementQuantity, decreaseQuantity, deleteQuantity } = cartSlice.actions;

export default cartSlice.reducer;
