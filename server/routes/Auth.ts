import express from "express";
import {
  loginWithEmail,
  loginWithNumber,
  RegisterUser,
} from "../controllers/Auth";

const gizmartRouter = express.Router();

gizmartRouter.post("/sign-up", RegisterUser);
gizmartRouter.post("/login-email", loginWithEmail);
gizmartRouter.post("/login-number", loginWithNumber);

export default gizmartRouter;
