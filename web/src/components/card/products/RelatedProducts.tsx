import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { CurrentProps } from "@/components/products/Current";
import { products } from "@/data/product";
import { fetchProducts } from "@/helper/fetch.action";

const RelatedProducts = ({ product }: CurrentProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response);
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) => p.collection === product.collection && p.slug !== product.slug
  );
  const empty = filteredProducts.length < 1;
  return (
    <DisplayCard
      headerLabel="You might also like"
      allUrl={`/collection/${product.collection}`}
      products={filteredProducts}
      className={empty ? "hidden" : ""}
    />
  );
};

export default RelatedProducts;
