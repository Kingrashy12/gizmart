import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import messageReducer from "./messageSlice";
import orderReducer from "./orderSlice";
import voucherReducer from "./voucherSlice";
import notificationReducer from "./notificationSlice";
import savedProductReducer from "./savedProductSlice";
import testUsersReducer from "./testUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    chat: chatReducer,
    message: messageReducer,
    notification: notificationReducer,
    order: orderReducer,
    product: productReducer,
    saved: savedProductReducer,
    test_user: testUsersReducer,
    user: userReducer,
    voucher: voucherReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
