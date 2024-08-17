import React from "react";
import ListOff from "../card/products/ListOff";
import { useAppSelector } from "@/hooks/store";

const Recommended = () => {
  const products = useAppSelector((state) => state.product.products);
  return <ListOff pageName="Recommended products" products={products} />;
};

export default Recommended;
