import { API_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchSeller = createAsyncThunk(
  "user/seller",
  async (slug: string | any, { rejectWithValue }) => {
    try {
      const seller = await axios.get(`${API_URL}/user/seller/${slug}`);
      return seller.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      rejectWithValue(error.response?.data);
    }
  }
);
