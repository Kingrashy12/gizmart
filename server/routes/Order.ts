import express from "express";
import {
  CancelOrder,
  completeOrder,
  confirmOrder,
  createOrder,
  getMarchantsOrder,
  getOrder,
  getOrders,
  getUserOrders,
  releaseOrder,
} from "../controllers/Order";
import { validate_voucher } from "../middleware/ValidateVoucher";

const OrderRoute = express.Router();

OrderRoute.post("/checkout", validate_voucher, createOrder);
// GET
OrderRoute.get("/all", getOrders);
OrderRoute.get("/all/:userId", getUserOrders);
OrderRoute.get("/one/:slug", getOrder);
OrderRoute.get("/all/marchants/:marchantsId", getMarchantsOrder);
// PATCH
OrderRoute.patch("/cancel/:orderId", CancelOrder);
OrderRoute.patch("/confirm/:orderId", confirmOrder);
OrderRoute.patch("/release/:orderId", releaseOrder);
OrderRoute.patch("/complete/:orderId", completeOrder);

export default OrderRoute;
