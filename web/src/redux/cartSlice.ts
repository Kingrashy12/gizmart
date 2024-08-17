import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartState = global?.localStorage?.getItem("gizmart_cart_items");
const cartItems: ProductType[] = cartState ? JSON.parse(cartState) : [];
// Total
const totalCarts = global?.localStorage?.getItem("gizmart_cart_total");
const cartTotal: string[] = totalCarts ? JSON.parse(totalCarts) : [];

const initialState: CartState = {
  items: cartItems,
  quantity: cartTotal,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      toast.success("Product added to cart");
      state.items.push(action.payload);
      state.quantity.push(action.payload._id);
      global?.localStorage?.setItem(
        "gizmart_cart_items",
        JSON.stringify(state.items)
      );
      global?.localStorage?.setItem(
        "gizmart_cart_total",
        JSON.stringify(state.quantity)
      );
    },
    incressQty: (state, action) => {
      state.quantity.push(action.payload._id);
      global?.localStorage?.setItem(
        "gizmart_cart_total",
        JSON.stringify(state.quantity)
      );
    },
    decreaseQty: (state, action) => {
      const productId = action.payload._id;
      const index = state.quantity.indexOf(productId);
      const updatedQty = state.quantity.filter((_, i) => i !== index);
      state.quantity = updatedQty;
      global?.localStorage?.setItem(
        "gizmart_cart_total",
        JSON.stringify(state.quantity)
      );
    },
    removeItem: (state, action) => {
      toast.success("Product successfully removed");
      const updatedItem = state.items.filter(
        (product) => product._id !== action.payload._id
      );
      const updatedQty = state.quantity.filter(
        (id) => id !== action.payload._id
      );
      global?.localStorage?.setItem(
        "gizmart_cart_items",
        JSON.stringify(updatedItem)
      );
      global?.localStorage?.setItem(
        "gizmart_cart_total",
        JSON.stringify(state.quantity)
      );
      return {
        ...state,
        items: updatedItem,
        quantity: updatedQty,
      };
    },
    clear_cart: (state) => {
      state.items = [];
      state.quantity = [];
      global?.localStorage?.setItem(
        "gizmart_cart_items",
        JSON.stringify(state.items)
      );
      global?.localStorage?.setItem(
        "gizmart_cart_total",
        JSON.stringify(state.quantity)
      );
    },
  },
  extraReducers(builder) {},
});

export default cartSlice.reducer;
export const { addToCart, incressQty, decreaseQty, removeItem, clear_cart } =
  cartSlice.actions;
