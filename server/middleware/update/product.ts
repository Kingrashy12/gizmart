import ProductModel from "../../models/Products";
import PriceModel from "../../models/PriceHistroy";

export async function update_product(
  productId: string,
  userId: string,
  form: any
) {
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.userId !== userId) {
    throw new Error("Unauthorized action");
  }

  if (form?.price) {
    const price = new PriceModel({ productId, price: form?.price });
    const newPrice = await price.save();
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        formalPrice: product.price,
        ...form,
        $push: { priceHistroy: newPrice },
      },
      { new: true }
    );
    return updatedProduct;
  } else {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      form,
      { new: true }
    );
    return updatedProduct;
  }
}
