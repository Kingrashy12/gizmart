import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const PriceModel = mongoose.model("Price-History", PriceSchema);

export default PriceModel;
