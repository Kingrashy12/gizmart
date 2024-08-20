import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
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
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
