import express from "express";
import {
  generateVoucher,
  getVouchers,
  validateVoucher,
} from "../controllers/Voucher";
import isAdmin from "../middleware/isAdmin";
import voucherValidation from "../middleware/ValidateVoucher";

const VoucherRoute = express.Router();

VoucherRoute.post("/new/:userId", isAdmin, generateVoucher);
VoucherRoute.patch("/validate/:code", voucherValidation, validateVoucher);
VoucherRoute.get("/all/:userId", getVouchers);

export default VoucherRoute;
