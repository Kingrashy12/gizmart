import { createSlice } from "@reduxjs/toolkit";
import { create_Chat, getChats } from "./thunks/chats";

const initialState: ChatsStateType = {
  chats: [],
  created_chat: {
    _id: "",
    members: [],
  },
  selectedChat: {
    user: {
      _id: "",
      name: "",
      isVerified: false,
      profile: "",
    },
    chat: {
      _id: "",
      members: [],
    },
  },
  fetchStatus: "",
  fetchError: "",
  createStatus: "",
  createError: "",
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    updatedChats: (state, action) => {
      state.chats = action.payload;
    },
    removeChat: (state) => {
      const updatedChat = {
        user: {
          _id: "",
          name: "",
          isVerified: false,
          profile: "",
        },
        chat: {
          _id: "",
          members: [],
        },
      };
      state.selectedChat = updatedChat;
    },
    clear_Create_Status: (state) => {
      state.createStatus = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(getChats.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      return { ...state, fetchStatus: "successful", chats: action.payload };
    });
    builder.addCase(getChats.rejected, (state, action) => {
      return { ...state, fetchError: action.payload, fetchStatus: "failed" };
    });
    builder.addCase(create_Chat.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(create_Chat.fulfilled, (state, action) => {
      return {
        ...state,
        createStatus: "successful",
        created_chat: action.payload,
      };
    });
    builder.addCase(create_Chat.rejected, (state, action) => {
      return { ...state, createStatus: "failed", createError: action.payload };
    });
  },
});

export default chatSlice.reducer;

export const { selectChat, updatedChats, removeChat, clear_Create_Status } =
  chatSlice.actions;
