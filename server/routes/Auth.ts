import express from "express";
import {
  changeEmail,
  changePassword,
  loginWithEmail,
  loginWithNumber,
  RegisterUser,
} from "../controllers/Auth";

const gizmartRouter = express.Router();

gizmartRouter.post("/sign-up", RegisterUser);
gizmartRouter.post("/login-email", loginWithEmail);
gizmartRouter.post("/login-number", loginWithNumber);
gizmartRouter.patch("/update-password", changePassword);
gizmartRouter.patch("/update-email", changeEmail);

export default gizmartRouter;
