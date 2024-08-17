import { Request, RequestHandler, Response } from "express";
import UserModel from "../models/User";
import genAuthToken from "../utils/genAuthToken";
import ProductModel from "../models/Products";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(403).json("UserId is required");
    const user = await UserModel.findById(userId);
    res.status(200).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const UpgradeToSeller = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json("User not found");
    if (user.isSeller) {
      return res.status(403).json("You can only perform this action once");
    } else {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { isSeller: true },
        { new: true }
      );
      const token = updatedUser && genAuthToken(updatedUser);
      res.status(200).json(token);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getSeller: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    const user = await UserModel.findOne({ slug }).select(
      "-chats -notifications -history -password -vouchers -favourites -orders"
    );
    if (!user) return res.status(404).json("Seller not found");
    const products = await Promise.all(
      user.products.map(async (id) => await ProductModel.findById(id))
    );
    res.status(200).json({ user, products });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
