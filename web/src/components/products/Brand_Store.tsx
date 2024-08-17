import React from "react";
import ListOff from "../card/products/ListOff";

interface BrandProps {
  products: ProductType[];
  brand: string;
  brand_slug: string;
}

const Brand_Store = ({ products, brand }: BrandProps) => {
  return (
    <ListOff
      hideBrandFilter
      pageName={brand}
      products={products}
      hasProductsFound
    />
  );
};

export default Brand_Store;
