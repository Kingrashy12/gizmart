import { RequestHandler } from "express";
import MessageModel from "../models/Message";
import { io } from "..";
import uploadImages from "../middleware/uploadImages";
import Cloud from "../utils/cloudinary";

export const sendMessage: RequestHandler = async (req, res) => {
  try {
    const { chatId, senderId, message, images } = req.body;
    if (!chatId) return res.status(403).json("ChatId is required");
    if (!senderId) return res.status(403).json("SenderId is required");
    if (images.length >= 1) {
      if (images.length > 4)
        return res.status(400).json("Image upload limit is 4 bg message");

      const uploadRes = await uploadImages("Gizmart_message", 4, images);

      if (!uploadRes) return res.status(400).json("Image upload failed");

      const msg = new MessageModel({
        chatId,
        senderId,
        message,
        images: uploadRes,
      });
      const newMessage = await msg.save();
      io.emit("new_message", newMessage, chatId);
      res.status(201).json(newMessage);
    } else {
      const msg = new MessageModel({
        chatId,
        senderId,
        message,
      });
      const newMessage = await msg.save();
      io.emit("new_message", newMessage, chatId);
      res.status(201).json(newMessage);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) return res.status(403).json("ChatId is required");
    const messages = await MessageModel.find({ chatId });
    io.emit("messages", messages, chatId);
    res.status(200).json(messages);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getUnreadMessages: RequestHandler = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) return res.status(403).json("ChatId is required");
    const messages = await MessageModel.find({ chatId });
    const unread = messages.filter((msg) => msg.seen === false);
    io.emit(`unread_messages`, unread, chatId);
    res.status(200).json(unread);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const ReadMessage: RequestHandler = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) return res.status(403).json("ChatId is required");
    const messages = await MessageModel.find({ chatId });
    if (!messages) return res.status(404).json("chats not found");
    await MessageModel.updateMany({ chatId }, { $set: { seen: true } });
    const updatedMessage = await MessageModel.find({ chatId });
    if (!updatedMessage) return res.status(404).json("message not found");
    const unread = updatedMessage;
    io.emit(`unread_messages`, unread, chatId);
    res.status(200).json(updatedMessage);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const editMessage: RequestHandler = async (req, res) => {
  try {
    const { messageId, userId, message } = req.body;

    if (!messageId || !userId) return res.status(400).json("Id is required");

    const updatedMessage = await MessageModel.findOneAndUpdate(
      { _id: messageId, senderId: userId },
      { $set: { message } },
      { new: true }
    );

    if (!updatedMessage)
      return res
        .status(400)
        .json(
          "Message not found or you're not authorized to edit this message"
        );

    res.status(200).json(updatedMessage);

    io.emit("updated_message", updatedMessage, messageId);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const deleteMessage: RequestHandler = async (req, res) => {
  try {
    const { messageId, userId } = req.body;
    if (!messageId || !userId) return res.status(400).json("Id is required");

    const message = await MessageModel.findById(messageId);
    if (!message || message.senderId !== userId) {
      return res
        .status(400)
        .json(
          "Message not found or you're not authorized to delete this message"
        );
    }

    // Delete images if they exist
    if (message.images.length >= 1) {
      await Promise.all(
        message.images.map((image) => Cloud.uploader.destroy(image?.public_id))
      );
    }

    await message.deleteOne();

    io.emit("deleted_message", message, messageId);

    return res.status(200).json(message);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error");
  }
};
