import { API_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type FormType = {
  userId: string;
  subcategory: string;
  category: string;
  color: string;
  price: number;
  name: string;
  description: string;
  brand: string;
  quantity: number;
  images: any[];
  delivery_fee: number;
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (form: FormType, { rejectWithValue }) => {
    try {
      const product = await axios.post(`${API_URL}/products/add-new-product`, {
        userId: form.userId,
        subcategory: form.subcategory,
        category: form.category,
        color: form.color,
        price: form.price,
        name: form.name,
        description: form.description,
        brand: form.brand,
        quantity: form.quantity,
        images: form.images,
        delivery_fee: form.delivery_fee,
      });
      return product.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      rejectWithValue(error.response?.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/all",
  async (id, { rejectWithValue }) => {
    try {
      const products = await axios.get(`${API_URL}/products`);
      return products.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      rejectWithValue(error.response?.data);
    }
  }
);

export const getSellerProducts = createAsyncThunk(
  "product/seller",
  async (userId: string, { rejectWithValue }) => {
    try {
      const products = await axios.get(`${API_URL}/products/seller/${userId}`);
      return products.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      rejectWithValue(error.response?.data);
    }
  }
);

interface DeleteProps {
  productId: string;
  userId: string;
}

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ userId, productId }: DeleteProps, { rejectWithValue }) => {
    try {
      const product = await axios.patch(`${API_URL}/products/delete`, {
        productId,
        userId,
      });
      return product.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      rejectWithValue(error.response?.data);
    }
  }
);
