"use client";

import { brands } from "@/data/brands";
import { colors } from "@/data/colors";
import { robotoFont } from "@/lib/fonts/font";
import {
  MultiSelect,
  MultiSelectItem,
  NumberInput,
  TextInput,
} from "@tremor/react";
import React, { useEffect, useState } from "react";

interface FilterProps {
  type: "color" | "brand" | "price-range" | "model" | "category";
  setColors?: any;
  Colors?: Array<string>;
  low?: number | string | any;
  high?: number | string | any;
  setLow?: any;
  setHigh?: any;
  handlePrice?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBrands?: any;
  Brands?: Array<string>;
}

const getType = (
  type: FilterProps["type"],
  setColors: FilterProps["setColors"],
  Colors: FilterProps["Colors"],
  setLow: FilterProps["setLow"],
  setHigh: FilterProps["setHigh"],
  low: FilterProps["low"],
  high: FilterProps["high"],
  handlePrice: FilterProps["handlePrice"],
  Brands: FilterProps["Brands"],
  setBrands: FilterProps["setBrands"]
) => {
  const handleSelectChange = (values: any) => {
    setColors(values);
  };
  const handleBrandChange = (values: any) => {
    setBrands(values);
    console.log("vales:", values);
  };

  switch (type) {
    case "color":
      return (
        <>
          <p className="font-medium ml-1 text-sm">Color</p>
          <MultiSelect
            placeholder="Choose color"
            value={Colors}
            onChange={handleSelectChange}
          >
            {colors.map((color, index) => (
              <MultiSelectItem
                // onClick={() => }
                key={index}
                value={color.value}
              >
                {color.color}
              </MultiSelectItem>
            ))}
          </MultiSelect>
        </>
      );
    case "brand":
      return (
        <>
          <p className="font-medium ml-1 text-sm">Brand</p>
          <MultiSelect
            placeholder="Select brand"
            value={Brands}
            onChange={handleBrandChange}
          >
            {brands.map((brand, index) => (
              <MultiSelectItem key={index} value={brand.value}>
                {brand.brand}
              </MultiSelectItem>
            ))}
          </MultiSelect>
        </>
      );
    case "price-range":
      return (
        <>
          <p className="font-medium ml-1 text-sm">Price (₦)</p>
          <div className="flex items-center gap-1 w-full max-[1024px]:flex-wrap">
            <NumberInput
              value={low}
              name="low"
              placeholder="Min"
              onChange={handlePrice}
              // min={low}
            />
            -
            <NumberInput
              value={high}
              name="high"
              placeholder="Max"
              onChange={handlePrice}
              // max={high}
            />
          </div>
        </>
      );
  }
};

const MobileProductFilter = ({
  type,
  setColors,
  Colors,
  setHigh,
  setLow,
  low,
  high,
  handlePrice,
  Brands,
  setBrands,
}: FilterProps) => {
  return (
    <div
      className={`${robotoFont.className} max-[480px]:flex flex-col gap-1 text-justify w-full relative hidden`}
    >
      {getType(
        type,
        setColors,
        Colors,
        setLow,
        setHigh,
        low,
        high,
        handlePrice,
        Brands,
        setBrands
      )}
    </div>
  );
};

export default MobileProductFilter;
