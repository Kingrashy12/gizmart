import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    formalPrice: { type: Number },
    subcategory: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: Array, required: true },
    quantity: { type: Number, required: true },
    delivery_fee: { type: Number, required: true },
    total: { type: Number, required: true },
    brand: { type: String, required: true },
    slug: { type: String, required: true },
    color: { type: String, required: true },
    priceHistroy: { type: Array, default: [] },
    views: { type: Array, default: [] },
    reviews: { type: Array, default: [] },
    rating: { type: Number, default: 0 },
    isPromoted: { type: Boolean, default: false },
    // Seller details
    sellerSlug: { type: String, required: true },
    sellerProfile: { type: Object, required: true },
    sellerName: { type: String, required: true },
    isSellerVerified: { type: Boolean, required: true },
    sellerTotalProducts: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
