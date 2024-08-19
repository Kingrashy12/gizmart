import { RequestHandler } from "express";
import VoucherModel from "../models/Voucher";
import generateCode from "../utils/generateCode";

export const generateVoucher: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      discountAmount,
      expiresAt,
      globalLimit,
      allProducts,
      hasLimit,
      allowedProducts,
      generatorId,
    } = req.body;

    const voucher = new VoucherModel({
      generatorId,
      discountAmount,
      expiresAt,
      allowedProducts,
      allProducts,
      hasLimit,
      globalLimit,
      code: "G-" + generateCode(8),
    });
    const newVoucher = await voucher.save();
    res.status(201).json(newVoucher);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const validateVoucher: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const { collection, userId, price } = req.body;

    if (!code) return res.status(400).json("Voucher code is required.");
    if (!collection || !userId)
      return res.status(400).json("Validation fields are required.");
    if (!price) return res.status(400).json("Price is required.");

    const voucher = await VoucherModel.findOne({ code });
    if (!voucher) return res.status(404).json("Voucher not found.");

    // Check if voucher is still valid
    const hasExpired = new Date(voucher.expiresAt) < new Date();
    if (hasExpired) return res.status(403).json("Voucher has expired.");

    // Check if voucher has reached global set limit
    const hasReachedUsageLimit = voucher.usedBy.length === voucher.globalLimit;
    if (hasReachedUsageLimit)
      return res.status(403).json("Voucher usage limit has been reached.");

    if (!voucher.isActive)
      return res.status(403).json("Voucher is not active.");

    const applyDiscount = () => {
      const discountAmount = (price / 100) * voucher.discountAmount;
      const data = {
        code,
        discountedPrice: price - discountAmount,
      };
      return data;
    };

    // const updateVoucherUsage = async () => {
    //   await voucher.updateOne({ $push: { usedBy: userId } });
    // };

    if (voucher.allProducts) {
      // Check if voucher has a user limit and if the user has used it before
      if (voucher.hasLimit && voucher.usedBy.includes(userId)) {
        return res.status(403).json("You can only use this voucher once.");
      }

      const discountedPrice = applyDiscount();
      // await updateVoucherUsage();
      return res.status(200).json(discountedPrice);
    } else {
      // Check if voucher can be used on the selected collection
      const canBeUsedOn = collection.some((c: any) =>
        voucher.allowedProducts.includes(c)
      );

      if (!canBeUsedOn) {
        return res
          .status(403)
          .json("Voucher can't be used on the selected collection.");
      }

      if (voucher.hasLimit && voucher.usedBy.includes(userId)) {
        return res.status(403).json("You can only use this voucher once.");
      }

      const discountedPrice = applyDiscount();
      // await updateVoucherUsage();
      return res.status(200).json(discountedPrice);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("An unexpected error occurred.");
  }
};

export const getVouchers: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const vouchers = await VoucherModel.find();
    if (!vouchers) return res.status(404).json("No voucher found");
    res.status(200).json(vouchers);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("An unexpected error occurred.");
  }
};
