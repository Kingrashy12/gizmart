import { RequestHandler } from "express";
import uploadImage from "../middleware/uploadImage";
import DemoUserModel from "../models/DemoUser";
import slugify from "../utils/slugify";
import genAuthToken from "../utils/genAuthToken";

export const addDemoAccount: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, number, isSeller, profile } = req.body;
    if (!name || !email || !number)
      return res.status(400).json("Account fileds is missing");
    if (!profile) return res.status(400).json("Please add user profile");
    const emailInUse = await DemoUserModel.findOne({ email });
    if (emailInUse) {
      return res.status(403).json("User already exits");
    }
    const uploadRes = await uploadImage("Gizmart_profile", profile);
    const user = new DemoUserModel({
      name,
      email,
      profile: uploadRes,
      number,
      isSeller,
      slug: slugify(name),
    });
    const demoAccount = await user.save();
    res.status(201).json({ message: "Demo user created", user: demoAccount });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const demoAccountLogin: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await DemoUserModel.findOneAndUpdate(
      { email },
      { $inc: { usedBy: +1 } }
    );
    if (!user) return res.status(404).json("Sorry user not found or deleted");
    const token = genAuthToken(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const fetchAllAccount: RequestHandler = async (req, res) => {
  try {
    const accounts = await DemoUserModel.find();
    if (!accounts) return res.status(404).json("No account added yet");
    res.status(200).json({ message: "Demo accounts installed", accounts });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
