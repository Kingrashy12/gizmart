import express from "express";
import {
  getSeller,
  getUserById,
  getUsers,
  UpgradeToSeller,
} from "../controllers/User";
import isAdmin from "../middleware/isAdmin";

const UserRoute = express.Router();

// GET
UserRoute.get("/all", getUsers);
UserRoute.get("/one/validate-id/:userId", getUserById);
UserRoute.get("/seller/:slug", getSeller);
// POST
UserRoute.post("/upgrade-to-seller", UpgradeToSeller);

export default UserRoute;
