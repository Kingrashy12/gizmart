import { ItemType } from "@/test/data";
import { CartType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartType = {
  items: [],
  isOpen: false,
  totalQty: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    addToCart: (state, action: PayloadAction<object>) => {
      const product = action.payload;
      const updatedItems = [...state.items, product];
      state.items = updatedItems;
    },
    incQty: (state, action: PayloadAction<object>) => {
      const product = action.payload;
      const itemToUpdate = state.items.find((p) => p.id === product.id);
      console.log("toUpdate:", itemToUpdate);
    },
  },
  extraReducers(builder) {},
});

export default cartSlice.reducer;
export const { openCart, closeCart, addToCart, incQty } = cartSlice.actions;
