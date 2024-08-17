import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  completeOrder,
  confirmOrder,
  getMarchantsOrder,
  getOrders,
  productCheckout,
  releaseOrder,
} from "./thunks/order";
import toast from "react-hot-toast";

const initialState: OrderStateType = {
  orders: [],
  marchants: [],
  check_out: {
    userId: "",
    products: [],
    eachQuantity: [],
    totalPrice: 0,
  },
  createStatus: "",
  createError: "",
  fetchStatus: "",
  fetchError: "",
  fetchMarchantsStatus: "",
  fetchMarchantError: "",
  cancelStatus: "",
  cancelError: "",
  confirmStatus: "",
  confirmError: "",
  releaseStatus: "",
  releaseError: "",
  completeStatus: "",
  completeError: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    check_out_product: (state, action) => {
      state.check_out = action.payload;
    },
    reset_status: (state) => {
      state.createStatus = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(productCheckout.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(productCheckout.fulfilled, (state, action) => {
      toast.success("Order successfully created");
      const updatedOrder = [action.payload, ...state.orders];
      return { ...state, createStatus: "successful", orders: updatedOrder };
    });
    builder.addCase(productCheckout.rejected, (state, action) => {
      return { ...state, createError: action.payload, createStatus: "failed" };
    });
    builder.addCase(getOrders.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      return { ...state, fetchStatus: "successful", orders: action.payload };
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      return { ...state, fetchStatus: "failed", fetchError: action.payload };
    });
    builder.addCase(getMarchantsOrder.pending, (state) => {
      return { ...state, fetchMarchantsStatus: "pending" };
    });
    builder.addCase(getMarchantsOrder.fulfilled, (state, action) => {
      return {
        ...state,
        fetchMarchantsStatus: "successful",
        marchants: action.payload,
      };
    });
    builder.addCase(getMarchantsOrder.rejected, (state, action) => {
      return {
        ...state,
        fetchMarchantsStatus: "failed",
        fetchMarchantError: action.payload,
      };
    });
    builder.addCase(cancelOrder.pending, (state, action) => {
      return { ...state, cancelStatus: "pending" };
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      const updatedOrders = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      if (typeof window !== undefined) {
        window.location.reload();
      }
      return { ...state, cancelStatus: "successful", orders: updatedOrders };
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
      return { ...state, cancelError: action.payload, cancelStatus: "failed" };
    });
    builder.addCase(confirmOrder.pending, (state) => {
      return { ...state, confirmStatus: "pending" };
    });
    builder.addCase(confirmOrder.fulfilled, (state, action) => {
      toast.success(
        `Order #${action.payload?.orderNumber} has been confirmed.`
      );
      const updatedOrders = state.marchants.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      return {
        ...state,
        confirmStatus: "successful",
        marchants: updatedOrders,
      };
    });
    builder.addCase(confirmOrder.rejected, (state, action) => {
      return {
        ...state,
        confirmError: action.payload,
        confirmStatus: "failed",
      };
    });
    builder.addCase(releaseOrder.pending, (state) => {
      return { ...state, releaseStatus: "pending" };
    });
    builder.addCase(releaseOrder.fulfilled, (state, action) => {
      const updatedOrders = state.marchants.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      return {
        ...state,
        releaseStatus: "successful",
        marchants: updatedOrders,
      };
    });
    builder.addCase(releaseOrder.rejected, (state, action) => {
      return {
        ...state,
        releaseError: action.payload,
        releaseStatus: "failed",
      };
    });
    builder.addCase(completeOrder.pending, (state) => {
      return { ...state, completeStatus: "pending" };
    });
    builder.addCase(completeOrder.fulfilled, (state, action) => {
      const updatedOrders = state.marchants.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      return {
        ...state,
        completeStatus: "successful",
        marchants: updatedOrders,
      };
    });
    builder.addCase(completeOrder.rejected, (state, action) => {
      return {
        ...state,
        completeError: action.payload,
        completeStatus: "failed",
      };
    });
  },
});

export default orderSlice.reducer;

export const { check_out_product, reset_status } = orderSlice.actions;
