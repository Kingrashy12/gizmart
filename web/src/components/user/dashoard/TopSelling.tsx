import ProductsDashoard from "@/components/table/ProductsDashoard";
import { productdas } from "@/data/chart";
import { Flex, HeaderOne } from "@/lib";
import React from "react";

const TopSelling = () => {
  return (
    <Flex className="flex-col p-1 bg-chartBg drop-shadow-sm rounded-xl">
      <Flex className="flex-col rounded-xl bg-white p-5 drop-shadow-md gap-3">
        <HeaderOne fontPoppins fontWeight="semi-bold" className="text-2xl">
          Products
        </HeaderOne>
        <ProductsDashoard productdas={productdas} />
      </Flex>
    </Flex>
  );
};

export default TopSelling;
