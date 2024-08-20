import { Request, RequestHandler, Response } from "express";
import UserModel from "../models/User";
import genAuthToken from "../utils/genAuthToken";
import ProductModel from "../models/Products";
import uploadImage from "../middleware/uploadImage";
import { updatedUser } from "../middleware/update/user";
import { generateNumber } from "../utils/generateCode";

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

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const { userId, profile, number, name } = req.body;
    if (!userId) return res.status(400).json("userId is missing");
    if (profile) {
      const imageRes = await uploadImage("Gizmart_profile", profile);
      const body = {
        name,
        number,
        profile: imageRes,
      };
      const data = await updatedUser(userId, body, res);
      res.status(200).json({ message: "Profile updated", data });
    } else {
      const body = {
        name,
        number,
      };
      const data = await updatedUser(userId, body, res);
      res.status(200).json({ message: "Profile updated", data });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const addAddress: RequestHandler = async (req, res) => {
  try {
    const { userId, state, city, address, current } = req.body;
    if (!userId) return res.status(400).json("userId is missing");
    if (!state || !city || !address)
      return res.status(400).json("address fileds is missing");
    const newAddress = {
      state,
      city,
      address,
      current,
      id: generateNumber(10),
    };
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { address: newAddress } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json("Internal server error");
    const token = genAuthToken(updatedUser);
    res.status(200).json({
      message: "Address successfully added",
      token,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
