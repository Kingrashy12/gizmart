import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    sellerId: { type: String, required: true },
    products: { type: Array, required: true },
    eachQuantity: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    deliveryStatus: { type: String, default: "Pending" },
    payment_method: { type: String, required: true },
    delivery_address: { type: Object, required: true },
    slug: { type: String, required: true },
    orderNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Orders", OrderSchema);

export default OrderModel;
