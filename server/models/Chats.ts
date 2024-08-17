import mongoose from "mongoose";

const ChatsSchema = new mongoose.Schema(
  {
    members: { type: Array, default: [] },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("Chats", ChatsSchema);

export default ChatModel;
