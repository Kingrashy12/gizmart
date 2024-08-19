import { RequestHandler } from "express";
import ChatModel from "../models/Chats";
import { io } from "..";
import UserModel from "../models/User";
import { chatUser, findChatUser, getUser } from "../middleware/user";

export const createChat: RequestHandler = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(403).json("Sender and receiver IDs are required");
    }

    const sender = await getUser(senderId);
    const receiver = await getUser(receiverId);

    if (!sender || !receiver) {
      return res.status(400).json("Error creating chat");
    }

    const sender_ = chatUser(sender);
    const receiver_ = chatUser(receiver);

    const existingChat = await ChatModel.findOne({
      members: { $all: [sender_, receiver_] },
    });

    if (existingChat) {
      console.log("Continue chatting");
      return res.status(200).json(existingChat);
    } else {
      const chat = new ChatModel({
        members: [sender_, receiver_],
      });
      const newChat = await chat.save();

      io.emit("new_chat", newChat);

      return res.status(201).json(newChat);
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

export const fetchUserChats: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(403).json("UserId is required");
    const user = await findChatUser(userId, res);
    const chats = await ChatModel.find({ members: user }).sort({
      createdAt: -1,
    });
    // io.emit("chats", chats);
    return res.status(200).json(chats);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const findUserChat: RequestHandler = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) return res.status(403).json("ChatId is required");
    const chat = await ChatModel.findById(chatId);
    if (!chat) return res.status(404).json("Chat not found");
    res.status(200).json(chat);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
