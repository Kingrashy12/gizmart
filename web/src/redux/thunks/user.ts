import { API_URL } from "@/constants";
import { fetch_demo_accounts } from "@/helper/fetch.action";
import { add_demo_user } from "@/helper/post.action";
// import { update_profile } from "@/helper/patch.action";
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
      const errorMessage = error.response?.data || "Internal server error";
      toast.error(errorMessage);
      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addDemoUser = createAsyncThunk(
  "user/add-demo",
  async ({ ...form }: DemoAccountFormType, { rejectWithValue }) => {
    try {
      const user = await add_demo_user(form);
      return user;
    } catch (error: any) {
      const errorMessage = error.response?.data || "Internal server error";
      toast.error(errorMessage);
      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getDemoAccounts = createAsyncThunk(
  "user/demo-all",
  async (id, { rejectWithValue }) => {
    try {
      const accounts = await fetch_demo_accounts();
      return accounts;
    } catch (error: any) {
      const errorMessage = error.response?.data || "Internal server error";
      toast.error(errorMessage, { id: "demo_fetch" });
      console.log(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
