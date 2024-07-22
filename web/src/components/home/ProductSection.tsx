import { robotoFont } from "@/lib/fonts/font";
import { Card, Icon } from "@tremor/react";
import Link from "next/link";
import React from "react";
import Wrapper from "../card/Wrapper";
import { products } from "@/data/product";
import Product from "../card/products/Product";

const ProductSection = () => {
  return (
    <Wrapper className="flex flex-col relative gap-6 w-full h-auto">
      <div
        className={`flex items-center justify-between w-full ${robotoFont.className}`}
      >
        <h1 className="text-xl font-medium">Recommended for you</h1>
        <Link
          href="/recommended"
          className="flex items-center hover:underline hover:opacity-75 text-primaryColor text-base"
        >
          <p
            className={`font-normal text-primaryColor capitalize ${robotoFont.className}`}
          >
            See all
          </p>
        </Link>
      </div>
      <div className="flex w-full gap-3 max-[800px]:overflow-x-auto no-scrollbar">
        {products.slice(0, 5).map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </Wrapper>
  );
};

export default ProductSection;
