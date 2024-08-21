import mongoose from "mongoose";

const DemoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    slug: { type: String, required: true },
    number: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isNumberVerified: { type: Boolean, default: false },
    profile: { type: Object },
    orders: { type: Array, default: [] },
    products: { type: Array, default: [] },
    history: { type: Array, default: [] },
    favourites: { type: Array, default: [] },
    vouchers: { type: Array, default: [] },
    chats: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
    address: { type: Array, default: [] },
    usedBy: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const DemoUserModel = mongoose.model("Demo-User", DemoSchema);

export default DemoUserModel;
