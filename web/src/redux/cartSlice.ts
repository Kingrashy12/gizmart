import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  // isOpen: false,
  // totalQty: 0,
  // totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {},
    incQty: (state) => {},
  },
  extraReducers(builder) {},
});

export default cartSlice.reducer;
export const { addToCart, incQty } = cartSlice.actions;
