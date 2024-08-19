import express from "express";
import {
  getSeller,
  getUserById,
  getUsers,
  updateProfile,
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
// PATCH
UserRoute.patch("/update-profile", updateProfile);

export default UserRoute;
