import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const savedState = global?.localStorage?.getItem("saved_product");
const savedItems = savedState ? JSON.parse(savedState) : [];
const initialState: SavedProductStateType = {
  items: savedItems,
};

const savedProductSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      const product = action.payload;
      if (!state.items.some((p) => p._id === product._id)) {
        const updatedItems = [product, ...state.items];
        toast.success("Product saved");
        state.items = updatedItems;
      } else {
        toast.success("Product removed");
        const updatedItems = state.items.filter((p) => p._id !== product._id);
        state.items = updatedItems;
      }
      global?.localStorage?.setItem(
        "saved_product",
        JSON.stringify(state.items)
      );
    },
  },
});

export default savedProductSlice.reducer;

export const { saveProduct } = savedProductSlice.actions;
