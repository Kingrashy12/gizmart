import { CurrentProps } from "@/components/products/Current";
import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { fetchProducts } from "@/helper/fetch.action";

const SameBrand = ({ product }: CurrentProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response);
    };
    getProducts();
  }, []);

  const brandName =
    product.brand.slice(0, 1).toUpperCase() + product.brand.slice(1);
  const filteredProducts = products.filter(
    (p) => p.brand === product.brand && p.slug !== product.slug
  );
  const empty = filteredProducts.length < 1;
  return (
    <DisplayCard
      headerLabel={`More products from ${brandName}`}
      allUrl={`/brand/${product.brand}/`}
      products={filteredProducts}
      className={empty ? "hidden" : ""}
    />
  );
};

export default SameBrand;
