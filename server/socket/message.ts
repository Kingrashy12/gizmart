import { Server, Socket } from "socket.io";
import MessageModel from "../models/Message";
import ChatModel from "../models/Chats";

export default function handleMessageSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("get_unread_messages", async (chatId) => {
      try {
        const messages = await MessageModel.find({ chatId });
        const unreadMessages = messages.filter((m) => !m.seen);

        socket.emit("fetch_unread", unreadMessages);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
        socket.emit("error", "Failed to retrieve unread messages.");
      }
    });

    //   socket.on("get_all_unread", async (userId) => {
    //       try {
    //           const chats = await ChatModel.find({ members: userId })
    //           const chatMessages = await Promise.all(chats.map(async(chat) => await MessageModel.find({chatId:chat._id})))
    //       } catch (error:any) {
    //         console.error("Error fetching unread messages:", error.message);
    //         socket.emit("error", "Failed to retrieve unread messages.");
    //       }
    //   })
    socket.on("get_last_message", async (chatId) => {
      try {
        const messages = await MessageModel.find({ chatId });
        const lastMessage = messages[messages.length - 1];
        socket.emit("last_message", lastMessage, chatId);
      } catch (error: any) {
        console.error("Error fetching unread messages:", error.message);
        socket.emit("error", "Failed to retrieve unread messages.");
      }
    });
  });
}
