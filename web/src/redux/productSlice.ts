import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSellerProducts,
} from "./thunks/product";
import toast from "react-hot-toast";

const initialState: ProductStateType = {
  products: [],
  seller_products: [],
  discountDeals: [],
  campaignDeals: [],
  fetchStatus: "",
  fetchError: "",
  createStatus: "",
  createError: "",
  fetch_products_status: "",
  fetch_products_error: "",
  delete_status: "",
  delete_error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createProduct.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      toast.success("Product successfully created");
      const updatedProducts = [action.payload, ...state.products];
      return {
        ...state,
        createStatus: "successful",
        products: updatedProducts,
      };
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      return { ...state, createError: action.payload, createStatus: "failed" };
    });
    builder.addCase(getProducts.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      return { ...state, fetchStatus: "successful", products: action.payload };
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      return { ...state, fetchError: action.payload, fetchStatus: "failed" };
    });
    builder.addCase(getSellerProducts.pending, (state) => {
      return { ...state, fetch_products_status: "pending" };
    });
    builder.addCase(getSellerProducts.fulfilled, (state, action) => {
      return {
        ...state,
        fetch_products_status: "successful",
        seller_products: action.payload,
      };
    });
    builder.addCase(getSellerProducts.rejected, (state, action) => {
      return {
        ...state,
        fetch_products_error: action.payload,
        fetch_products_status: "failed",
        seller_products: [],
      };
    });
    builder.addCase(deleteProduct.pending, (state) => {
      return { ...state, delete_status: "pending" };
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      toast.success("product deleted");
      const updatedaProducts = state.seller_products.filter(
        (product) => product._id !== action.payload._id
      );
      return {
        ...state,
        delete_status: "successful",
        seller_products: updatedaProducts,
      };
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return {
        ...state,
        delete_error: action.payload,
        delete_status: "failed",
      };
    });
  },
});

export default productSlice.reducer;
