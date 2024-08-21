import { Response } from "express";
import UserModel from "../../models/User";
import genAuthToken from "../../utils/genAuthToken";
import DemoUserModel from "../../models/DemoUser";

export async function updatedUser(userId: string, body: any, res: Response) {
  // Switched to demo
  const user = await DemoUserModel.findByIdAndUpdate(userId, body, {
    new: true,
  }).select("-notifications -products -chats -favourites -vouchers -orders");
  if (!user) return res.status(400).json("User not found");
  const token = genAuthToken(user);

  return token;
}
