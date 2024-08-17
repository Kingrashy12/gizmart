import { RequestHandler } from "express";
import VoucherModel from "../models/Voucher";

const voucherValidation: RequestHandler = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Ensure the code is provided
    if (!code) return res.status(400).json("Validation code is missing.");

    const voucher = await VoucherModel.findOne({ code });

    // Check if voucher exists
    if (!voucher) return res.status(404).json("Voucher not found.");

    const now = new Date();
    const hasExpired = now >= new Date(voucher.expiresAt);

    // If the voucher has expired, deactivate it and send a response
    if (hasExpired) {
      if (voucher.isActive) {
        await voucher.updateOne({ $set: { isActive: false } });
      }
      return res.status(400).json("Sorry, this voucher is not active.");
    }

    // If the voucher is valid, proceed to the next middleware
    next();
  } catch (error: any) {
    next(error); // Pass the error to the error-handling middleware
  }
};

export default voucherValidation;

export const validate_voucher: RequestHandler = async (req, res, next) => {
  try {
    const { voucherCode } = req.body;

    // Ensure the voucherCode is provided
    if (voucherCode) {
      const voucher = await VoucherModel.findOne({ code: voucherCode });

      // Check if voucher exists
      if (!voucher) return res.status(404).json("Voucher not found.");

      const now = new Date();
      const hasExpired = now >= new Date(voucher.expiresAt);

      // If the voucher has expired, deactivate it and send a response
      if (hasExpired) {
        if (voucher.isActive) {
          await voucher.updateOne({ $set: { isActive: false } });
        }
        return res.status(400).json("Sorry, this voucher is not active.");
      }
    }

    // If the voucher is valid, proceed to the next middleware
    next();
  } catch (error: any) {
    next(error); // Pass the error to the error-handling middleware
  }
};
