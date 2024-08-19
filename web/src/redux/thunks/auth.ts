import { API_URL } from "@/constants";
import {
  update_email,
  update_profile,
  UpgradeToSeller,
} from "@/helper/patch.action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type FormType = {
  name: string;
  email: string;
  password: string;
  number: string;
  profile: string;
};
type LoginFormType = {
  email: string;
  password: string;
  number: string;
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (form: FormType, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${API_URL}/auth/sign-up`, {
        name: form.name,
        email: form.email,
        password: form.password,
        number: form.number,
        profile: form.profile,
      });
      global?.localStorage?.setItem("gizmart_auth_key", token?.data);
      return token.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithemail",
  async (form: LoginFormType, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${API_URL}/auth/login-email`, {
        email: form.email,
        password: form.password,
      });
      global?.localStorage?.setItem("gizmart_auth_key", token?.data);
      return token.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginWithNumber = createAsyncThunk(
  "auth/loginWithnumber",
  async (form: LoginFormType, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${API_URL}/auth/login-number`, {
        number: form.number,
        password: form.password,
      });
      global?.localStorage?.setItem("gizmart_auth_key", token?.data);
      return token.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const upgradeToSeller = createAsyncThunk(
  "auth/upgrade-to-seller",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = await UpgradeToSeller(userId);
      global?.localStorage?.setItem("gizmart_auth_key", token?.data);
      return token.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateEmail = createAsyncThunk(
  "auth/update-email",
  async ({ ...form }: EmailUpdateType, { rejectWithValue }) => {
    try {
      const res = await update_email(form);
      global?.localStorage?.setItem("gizmart_auth_key", res?.data.token);
      return res;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async ({ ...form }: ProfileUpdateType, { rejectWithValue }) => {
    try {
      const res = await update_profile(form);
      global?.localStorage?.setItem("gizmart_auth_key", res?.data);
      return res;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      rejectWithValue(error.response?.data);
    }
  }
);
