import { NextFunction, RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../types";
import UserModel from "../models/User";

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(401).json("User not found");
    const isAdminUser = user?.isAdmin;
    if (!isAdminUser)
      return res.status(401).json("You can't perform this action");
    next();
  } catch (error: any) {
    next(error.message);
    res.status(500).json(error.message);
  }
};

export default isAdmin;
