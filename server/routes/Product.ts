import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getSellerProducts,
} from "../controllers/Product";

const ProductRoute = express.Router();

ProductRoute.post("/add-new-product", createProduct);
// GET
ProductRoute.get("/", getProducts);
ProductRoute.get("/one/:slug/view/:userId", getProduct);
ProductRoute.get("/seller/:userId", getSellerProducts);
// PATCH
ProductRoute.patch("/delete", deleteProduct);

export default ProductRoute;
