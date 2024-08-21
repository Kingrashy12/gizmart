import express from "express";
import {
  addDemoAccount,
  demoAccountLogin,
  fetchAllAccount,
} from "../controllers/Demo_User";
import isAdmin from "../middleware/isAdmin";

const DemoAccountRoute = express.Router();

DemoAccountRoute.post("/add/:userId", isAdmin, addDemoAccount);
DemoAccountRoute.post("/login", demoAccountLogin);
DemoAccountRoute.get("/all", fetchAllAccount);

export default DemoAccountRoute;
