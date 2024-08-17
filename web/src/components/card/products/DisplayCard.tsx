import { robotoFont } from "@/lib/fonts/font";
import Link from "next/link";
import React from "react";
// import { products } from "@/data/product";
import Wrapper from "../Wrapper";
import Product from "./Product";
import { No_Products_Found } from "@/lib";

interface DisplayProps {
  products: ProductType[];
  headerLabel: string;
  allUrl: string;
  className?: string;
  noProducts?: boolean;
  noProductsMsg?: string | any;
  emptyProductsMsg?: string | any;
}

const DisplayCard = ({
  products,
  allUrl,
  headerLabel,
  className,
  noProducts,
  noProductsMsg,
  emptyProductsMsg,
}: DisplayProps) => {
  return (
    <Wrapper
      className={`${className} flex flex-col relative gap-6 w-full h-auto`}
    >
      <div
        className={`flex items-center justify-between w-full ${robotoFont.className}`}
      >
        <h1 className="text-xl font-medium">{headerLabel}</h1>
        <Link
          href={allUrl}
          className={`${
            noProducts ? "hidden" : "flex"
          } items-center hover:underline hover:opacity-75 text-primaryColor text-base`}
        >
          <p
            className={`font-normal text-primaryColor capitalize ${robotoFont.className}`}
          >
            See all
          </p>
        </Link>
      </div>
      <div className="flex w-full gap-3 max-[1024px]:overflow-x-auto no-scrollbar">
        {products && products.length < 1 ? (
          <No_Products_Found message={emptyProductsMsg} />
        ) : noProducts ? (
          <No_Products_Found message={noProductsMsg} />
        ) : (
          products
            ?.slice(0, 6)
            .map((product, index) => <Product key={index} product={product} />)
        )}
      </div>
    </Wrapper>
  );
};

export default DisplayCard;
