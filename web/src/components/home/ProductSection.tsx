import { robotoFont } from "@/lib/fonts/font";
import Link from "next/link";
import React from "react";
import Wrapper from "../card/Wrapper";
import Product from "../card/products/Product";
import DisplayCard from "../card/products/DisplayCard";
import { useAppSelector } from "@/hooks/store";

const ProductSection = () => {
  const products = useAppSelector((state) => state.product.products);
  return (
    <DisplayCard
      headerLabel="Recommened products"
      allUrl="/recommended"
      products={products}
    />
  );
};

export default ProductSection;
