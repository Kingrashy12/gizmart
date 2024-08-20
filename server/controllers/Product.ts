import { RequestHandler } from "express";
import Cloud from "../utils/cloudinary";
import ProductModel from "../models/Products";
import UserModel from "../models/User";
import PriceModel from "../models/PriceHistroy";
import slugify from "../utils/slugify";
import { pLimit } from "../middleware/pLimit";
import { update_product } from "../middleware/update/product";

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const {
      userId,
      description,
      name,
      price,
      subcategory,
      category,
      brand,
      color,
      images,
      quantity,
      delivery_fee,
    } = req.body;
    if (images) {
      const limit = pLimit(10);
      const user = await UserModel.findById(userId);
      if (!user) return res.status(404).json("User not found");
      const imagesToUpload = images.map((image: any) => {
        return limit(async () => {
          const result = await Cloud.uploader.upload(image, {
            upload_preset: "Gizmart_Products",
          });
          return result;
        });
      });

      const uploads = await Promise.all(imagesToUpload);

      const product = new ProductModel({
        userId,
        name,
        description,
        price,
        brand,
        subcategory,
        category,
        color,
        images: uploads,
        quantity,
        delivery_fee,
        total: quantity,
        slug: slugify(name),
        sellerSlug: user.slug,
        sellerProfile: user.profile,
        sellerName: user.name,
        isSellerVerified: user.isVerified,
        sellerTotalProducts: user.products.length,
      });
      const newProducts = await product.save();
      const pId: string = newProducts._id.toString();
      const Price = new PriceModel({ price, productId: newProducts._id });
      const newPrice = await Price.save();
      await newProducts.updateOne({ $push: { priceHistory: newPrice } });
      await user.updateOne({ $push: { products: pId } });
      newProducts.sellerTotalProducts = user.products.length;
      newProducts.priceHistroy.unshift(newPrice);
      const updatedProduct = await newProducts.save();
      res.status(201).json(updatedProduct);
    } else {
      return res.status(403).json("Image is required");
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    if (!products) return res.status(404).json("No poducts available");
    res.status(200).json(products);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json("Internal server error");
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const { slug, userId } = req.params;
    const product = await ProductModel.findOne({ slug });
    if (!product) return console.log("Product not found");
    if (!product.views.includes(userId)) {
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { slug },
        { $push: { views: userId } },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } else {
      res.status(200).json(product);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getSellerProducts: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await ProductModel.find({ userId });
    res.status(200).json(products);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const product = await ProductModel.findById(productId);
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json("User not found");
    if (!product) return res.status(404).json("product not found");
    if (product.userId !== userId) {
      return res
        .status(401)
        .json("You're unauthorized to carry on this action");
    } else {
      product.images.map(
        async (m) => await Cloud.uploader.destroy(m.public_id)
      );
      await product.deleteOne();
      await user.updateOne({ $pull: { products: productId } });
      const updatedProduct = user.products.filter((id) => id !== productId);
      user.products = updatedProduct;
      await user.save();
      return res.status(200).json(product);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!productId) return res.status(400).json("productId is missing");
    if (!userId) return res.status(400).json("userId is missing");
    const updatedProduct = await update_product(productId, userId, req.body);
    res.status(200).json({
      message: "Product successfully updated",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
