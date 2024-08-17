import {
  fetch_marchants_order,
  fetch_order,
  fetch_orders,
} from "@/helper/fetch.action";
import {
  cancel_order,
  confirm_order,
  release_order,
  complete_order,
} from "@/helper/patch.action";
import { create_order } from "@/helper/post.action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const productCheckout = createAsyncThunk(
  "order/checkout",
  async ({ ...body }: CheckOutBody, { rejectWithValue }) => {
    try {
      const order = await create_order(body);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-all",
  async (userId: string, { rejectWithValue }) => {
    try {
      const orders = await fetch_orders(userId);
      return orders;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/get-one",
  async (slug: string, { rejectWithValue }) => {
    try {
      const order = await fetch_order(slug);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMarchantsOrder = createAsyncThunk(
  "order/get-marchants",
  async (marchantsId: string, { rejectWithValue }) => {
    try {
      const order = await fetch_marchants_order(marchantsId);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancel",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const order = await cancel_order(orderId);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "order/confirm",
  async ({ ...data }: OrderReleaseType, { rejectWithValue }) => {
    try {
      const order = await confirm_order(data);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const releaseOrder = createAsyncThunk(
  "order/release",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const order = await release_order(orderId);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeOrder = createAsyncThunk(
  "order/complete",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const order = await complete_order(orderId);
      return order;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
