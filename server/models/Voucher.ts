import mongoose from "mongoose";

const VoucherSchema = new mongoose.Schema(
  {
    generatorId: { type: String, required: true },
    userId: { type: String },
    code: { type: String, required: true },
    hasLimit: { type: Boolean, default: false },
    expiresAt: { type: String, required: true },
    globalLimit: { type: Number, required: true },
    usedBy: { type: Array, default: [] },
    isActive: { type: Boolean, default: true },
    allProducts: { type: Boolean, default: true },
    allowedProducts: { type: Array, default: [] },
    discountAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const VoucherModel = mongoose.model("Voucher", VoucherSchema);

export default VoucherModel;
