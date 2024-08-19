import { Response } from "express";
import UserModel from "../models/User";
import { UserTokenType } from "../types";

export async function getUser(userId: string) {
  const user = await UserModel.findById(userId);
  return user;
}

export function chatUser(user: UserTokenType) {
  return {
    name: user.name,
    profile: user.profile,
    isVerified: user.isVerified,
    _id: user._id,
  };
}

export async function findChatUser(userId: string, res: Response) {
  const user = await getUser(userId);
  if (!user) return res.status(400).json("Internal server error");
  const user_ = chatUser(user);

  return user_;
}
