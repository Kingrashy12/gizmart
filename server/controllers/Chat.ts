import { RequestHandler } from "express";
import ChatModel from "../models/Chats";
import { io } from "..";

export const createChat: RequestHandler = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId)
      return res.status(403).json("Sender and receiver IDs are required");
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (existingChat) {
      console.log("Continue chating");
      res.status(200).json(existingChat);
    } else {
      const chat = new ChatModel({
        members: [senderId, receiverId],
      });
      const newChat = await chat.save();
      io.emit("new_chat", newChat);
      return res.status(201).json(newChat);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const fetchUserChats: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(403).json("UserId is required");
    const chats = await ChatModel.find({ members: userId }).sort({
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
