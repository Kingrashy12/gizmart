import { Request, Response } from "express";
import UserModel from "../models/User";
import hashPassword from "../utils/hashPassword";
import slugify from "../utils/slugify";
import genAuthToken from "../utils/genAuthToken";
import sendSms from "../utils/sendSms";
import Cloud from "../utils/cloudinary";
import comparePassword from "../utils/comparePassword";
import sendVerificationCode from "../utils/sendVerificationCode";

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
    // await sendSms(
    //   number,
    //   `Welcome to Gizmart ${name}!. Login to your dashboard and start your advanture`
    // );
    // sendVerificationCode(number);
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
