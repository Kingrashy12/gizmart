import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationStateType = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (state, action) => {
      state.notifications = action.payload;
    },
    readNotification: (state, action) => {
      const notification = action.payload;
      const updatedNotification = state.notifications.map((n) =>
        n._id === notification._id ? notification : n
      );
      state.notifications = updatedNotification;
    },
  },
  extraReducers(builder) {},
});

export default notificationSlice.reducer;
export const { updateNotification, readNotification } =
  notificationSlice.actions;
