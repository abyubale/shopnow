import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  quantity: 1,
};

export const addSubSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    increaseQuantityByCount: (state) => {
      state.quantity += 1;
    },
    decreaseQuantityByCount: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1;
      }
    },
    addItemByCount: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += state.quantity;
        state.quantity = 1;
      } else {
        state.items.push({ ...action.payload, quantity: state.quantity });
        state.quantity = 1;
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  increaseQuantityByCount,
  decreaseQuantityByCount,
  addItemByCount,
  emptyCart,
} = addSubSlice.actions;
export const selectCart = (state) => state.cart;
export default addSubSlice.reducer;
