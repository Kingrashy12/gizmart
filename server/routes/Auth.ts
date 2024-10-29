import express from "express";
import {
  changeEmail,
  changePassword,
  checkMail,
  loginWithEmail,
  loginWithNumber,
  RegisterUser,
} from "../controllers/Auth";

const gizmartRouter = express.Router();

gizmartRouter.post("/sign-up", RegisterUser);
gizmartRouter.post("/check-mail", checkMail);
gizmartRouter.post("/login-email", loginWithEmail);
gizmartRouter.post("/login-number", loginWithNumber);
gizmartRouter.patch("/update-password", changePassword);
gizmartRouter.patch("/update-email", changeEmail);

export default gizmartRouter;
