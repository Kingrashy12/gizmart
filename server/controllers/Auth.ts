import { Request, RequestHandler, Response } from "express";
import UserModel from "../models/User";
import hashPassword from "../utils/hashPassword";
import slugify from "../utils/slugify";
import genAuthToken from "../utils/genAuthToken";
import Cloud from "../utils/cloudinary";
import comparePassword from "../utils/comparePassword";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, number, profile } = req.body;

    if (!name || !email || !password || !number) {
      return res.status(400).json("Required field missing");
    }

    const emailExits = await UserModel.findOne({ email });
    if (emailExits) return res.status(403).json("User already exits");
    const numberExit = await UserModel.findOne({ number });
    if (numberExit) return res.status(403).json("Number already in use");

    // Upload profile to cloudinary
    const uploadRes = await Cloud.uploader.upload(profile, {
      upload_preset: "Gizmart_profile",
    });
    const newUser = new UserModel({
      name,
      email,
      password: await hashPassword(password),
      number,
      slug: slugify(name),
      profile: uploadRes,
    });
    const user = await newUser.save();
    const token = genAuthToken(user);

    res.status(200).json(token);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const loginWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json("User not found");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(403).json("Incorrect password");
    const token = genAuthToken(user);
    const userToken = token;
    res.cookie("userToken", userToken, { httpOnly: true, secure: true });
    // const { userToken } = req.cookies;
    // console.log("User Login Credentials:", userToken);
    return res.status(200).json(token);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const loginWithNumber = async (req: Request, res: Response) => {
  try {
    const { number, password } = req.body;
    const user = await UserModel.findOne({ number });
    if (!user) return res.status(404).json("User not found");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(403).json("Incorrect password");
    const token = genAuthToken(user);
    return res.status(200).json(token);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const changePassword: RequestHandler = async (req, res) => {
  try {
    const { userId, password, newPassword } = req.body;
    if (!userId || !password || !newPassword) {
      return res.status(400).json("Missing required fields");
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Incorrect current password");
    }
    const isSame = await comparePassword(newPassword, user.password);
    if (isSame) {
      return res.status(400).json("You can't use the same password");
    }
    const hashedPass = await hashPassword(newPassword);
    await user.updateOne({ $set: { password: hashedPass } });
    res.status(200).json({ message: "Password successfully updated" });
  } catch (error: any) {
    console.error("Error changing password:", error.message);
    res.status(500).json("Internal server error");
  }
};

export const changeEmail: RequestHandler = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId) return res.status(400).json("userId is missing");
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    );
    if (user) {
      const token = genAuthToken(user);
      const data = { token, user: user.email };
      res.status(200).json({ message: "Email updated", data });
    } else return res.status(404).json("Update error: user not found");
  } catch (error: any) {
    console.error("Error changing email:", error.message);
    res.status(500).json("Internal server error");
  }
};
