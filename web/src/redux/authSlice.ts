import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loginWithEmail,
  loginWithNumber,
  updateEmail,
  upgradeToSeller,
  updateProfile,
} from "./thunks/auth";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  token: global?.localStorage?.getItem("gizmart_auth_key") || "",
  userId: "",
  name: "",
  email: "",
  profile: "",
  number: "",
  isAdmin: false,
  isSeller: false,
  isVerified: false,
  isNumberVerified: false,
  loginStatus: "",
  loginError: "",
  registerStatus: "",
  registerError: "",
  upgradeStatus: "",
  upgradeError: "",
  userLoaded: false,
  mailUpdateStatus: "",
  mailUpdateError: "",
  updateStatus: "",
  updateError: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state) => {
      const token = global?.localStorage?.getItem("gizmart_auth_key");
      if (token) {
        const user: UserType = jwtDecode(token);
        return {
          ...state,
          token: token,
          name: user.name,
          email: user.email,
          userId: user._id,
          profile: user.profile,
          number: user.number,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          isNumberVerified: user.isNumberVerified,
          userLoaded: true,
        };
      }
    },
    logUserout: (state: any) => {
      global?.localStorage?.removeItem("gizmart_auth_key");
      global?.localStorage?.removeItem("gizmart_auth_userId");
      toast.success("You've logged out of your account");
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        userId: "",
        profile: "",
        number: "",
        isAdmin: "",
        isSeller: "",
        isNumberVerified: "",
        userLoaded: false,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(createUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      toast.success("Account successfully created");
      const token = action.payload;
      global?.localStorage.setItem("gizmart_auth_key", token);
      const user: UserType = jwtDecode(token);
      global?.localStorage.setItem(
        "gizmart_auth_userId",
        JSON.stringify(user._id)
      );
      if (typeof window !== undefined) {
        window.location.href = "/";
      }
      return {
        ...state,
        token: token,
        name: user.name,
        email: user.email,
        userId: user._id,
        profile: user.profile,
        number: user.number,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        isNumberVerified: user.isNumberVerified,
        userLoaded: true,
        registerStatus: "successful",
      };
    });
    builder.addCase(createUser.rejected, (state, action) => {
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "failed",
      };
    });
    builder.addCase(loginWithEmail.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      toast.success("Welcome back");
      if (typeof window !== undefined) {
        window.location.href = "/";
      }
      const token = action.payload;
      const user: UserType = jwtDecode(token);
      global?.localStorage.setItem(
        "gizmart_auth_userId",
        JSON.stringify(user._id)
      );
      return {
        ...state,
        token: token,
        name: user.name,
        email: user.email,
        userId: user._id,
        profile: user.profile,
        number: user.number,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        isNumberVerified: user.isNumberVerified,
        userLoaded: true,
        loginStatus: "successful",
      };
    });
    builder.addCase(loginWithEmail.rejected, (state, action) => {
      return { ...state, loginError: action.payload, loginStatus: "failed" };
    });
    builder.addCase(loginWithNumber.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginWithNumber.fulfilled, (state, action) => {
      toast.success("Welcome back");
      if (typeof window !== undefined) {
        window.location.href = "/";
      }
      const token = action.payload;
      const user: UserType = jwtDecode(token);

      return {
        ...state,
        token: token,
        name: user.name,
        email: user.email,
        userId: user._id,
        profile: user.profile,
        number: user.number,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        isNumberVerified: user.isNumberVerified,
        userLoaded: true,
        loginStatus: "successful",
      };
    });
    builder.addCase(loginWithNumber.rejected, (state, action) => {
      return { ...state, loginError: action.payload, loginStatus: "failed" };
    });
    builder.addCase(upgradeToSeller.pending, (state) => {
      return { ...state, upgradeStatus: "pending" };
    });
    builder.addCase(upgradeToSeller.fulfilled, (state, action) => {
      toast.success("Account upgrade completed successfully.");
      const token = action.payload;
      global?.localStorage.setItem("gizmart_auth_key", token);
      const user: UserType = jwtDecode(token);
      if (typeof window !== undefined) {
        window.location.href = "/";
      }
      return {
        ...state,
        token: token,
        name: user.name,
        email: user.email,
        userId: user._id,
        profile: user.profile,
        number: user.number,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        isNumberVerified: user.isNumberVerified,
        userLoaded: true,
        upgradeStatus: "successful",
      };
    });
    builder.addCase(upgradeToSeller.rejected, (state, action) => {
      return {
        ...state,
        upgradeError: action.payload,
        upgradeStatus: "failed",
      };
    });
    builder.addCase(updateEmail.pending, (state) => {
      return { ...state, mailUpdateStatus: "pending" };
    });
    builder.addCase(updateEmail.fulfilled, (state, action) => {
      toast.success(action.payload.message);
      return {
        ...state,
        mailUpdateStatus: "successful",
        email: action.payload.data.user,
      };
    });
    builder.addCase(updateEmail.rejected, (state, action) => {
      return {
        ...state,
        mailUpdateError: action.payload,
        mailUpdateStatus: "failed",
      };
    });
    builder.addCase(updateProfile.pending, (state, action) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      toast.success(action.payload.message);
      const user: UserType = jwtDecode(action.payload.data);
      return {
        ...state,
        name: user.name,
        email: user.email,
        profile: user.profile,
        number: user.number,
        updateStatus: "successful",
      };
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      return { ...state, updateStatus: "failed", updateError: action.payload };
    });
  },
});

export default AuthSlice.reducer;

export const { loadUser, logUserout } = AuthSlice.actions;
