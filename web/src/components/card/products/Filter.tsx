import React from "react";
import Wrapper from "../Wrapper";
import { robotoFont } from "@/lib/fonts/font";
import Product from "@/components/filter/Product";
import { ProductType } from "./Product";

interface FilterProps {
  product: ProductType[];
  setColors: any;
  colors: Array<string>;
  setBrands: any;
  brands: Array<string>;
  low: number | string | any;
  high: number | string | any;
  setLow: any;
  setHigh: any;
  handlePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({
  product,
  setColors,
  colors,
  setLow,
  setHigh,
  low,
  high,
  handlePrice,
  brands,
  setBrands,
}: FilterProps) => {
  return (
    <Wrapper className="w-[180px] max-[1024px]:w-[320px] flex flex-col /relative gap-3 h-full max-[800px]:hidden">
      <h1 className={`${robotoFont.className} font-semibold text-lg`}>
        Filter by
      </h1>
      <Product type="color" setColors={setColors} Colors={colors} />
      <Product type="brand" setBrands={setBrands} Brands={brands} />
      <Product
        type="price-range"
        setHigh={setHigh}
        setLow={setLow}
        low={low}
        high={high}
        handlePrice={handlePrice}
      />
    </Wrapper>
  );
};

export default Filter;
