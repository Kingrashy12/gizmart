import { fetchUserChats } from "@/helper/fetch.action";
import { createChat } from "@/helper/post.action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getChats = createAsyncThunk(
  "chats/all",
  async (userId: string, { rejectWithValue }) => {
    try {
      const chats = await fetchUserChats(userId);
      return chats;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

type ChatType = {
  senderId: string;
  receiverId: string;
};

export const create_Chat = createAsyncThunk(
  "chats/create",
  async ({ senderId, receiverId }: ChatType, { rejectWithValue }) => {
    try {
      const chat = await createChat(senderId, receiverId);
      return chat;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);
