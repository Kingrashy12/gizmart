import React from "react";
import { robotoFont } from "@/lib/fonts/font";
import Product from "@/components/filter/Product";
import Wrapper from "../card/Wrapper";
import MobileProductFilter from "./filter/MobileProductFilter";

interface FilterProps {
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

const MobileFilter = ({
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
    <Wrapper className="w-full max-[480px]:flex flex-col relative gap-3 h-full hidden">
      <h1 className={`${robotoFont.className} font-semibold text-lg`}>
        Filter by
      </h1>
      <MobileProductFilter type="color" setColors={setColors} Colors={colors} />
      <MobileProductFilter type="brand" setBrands={setBrands} Brands={brands} />
      <MobileProductFilter
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

export default MobileFilter;
