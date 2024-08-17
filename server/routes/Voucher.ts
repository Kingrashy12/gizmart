import express from "express";
import { generateVoucher, validateVoucher } from "../controllers/Voucher";
import isAdmin from "../middleware/isAdmin";
import voucherValidation from "../middleware/ValidateVoucher";

const VoucherRoute = express.Router();

VoucherRoute.post("/new/:userId", isAdmin, generateVoucher);
VoucherRoute.patch("/validate/:code", voucherValidation, validateVoucher);

export default VoucherRoute;
