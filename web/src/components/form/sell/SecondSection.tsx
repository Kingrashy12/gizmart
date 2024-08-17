import { brands } from "@/data/brands";
import { colors } from "@/data/colors";
import { Flex, FlexBetween, Paragraph } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import React, { useEffect, useState } from "react";
import { SellProps } from "./CollectionSection";

const SecondSection = ({ form, setForm, isCreating }: SellProps) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    if (isCreating) {
      setSelectedColor("");
      setSelectedBrand("");
    }
  }, [isCreating]);

  function handleColor(value: any) {
    setSelectedColor(value);
    setForm({ ...form, color: value });
  }
  function handleBrand(value: any) {
    setSelectedBrand(value);
    setForm({ ...form, brand: value });
  }

  return (
    <FlexBetween
      className={`${poppinsFont.className} items-center gap-3 text-black font-medium text-sm`}
    >
      <Flex className="flex-col gap-2">
        <Paragraph>Color</Paragraph>
        <SearchSelect
          placeholder="Search color"
          value={selectedColor}
          onChange={handleColor}
        >
          {colors.map((color, index) => (
            <SearchSelectItem key={index} value={color.value}>
              {color.color}
            </SearchSelectItem>
          ))}
        </SearchSelect>
      </Flex>
      <Flex className="flex-col gap-2">
        <Paragraph>Brand</Paragraph>
        <SearchSelect
          placeholder="Search brand"
          value={selectedBrand}
          onChange={handleBrand}
        >
          {brands.map((brand, index) => (
            <SearchSelectItem key={index} value={brand.value}>
              {brand.brand}
            </SearchSelectItem>
          ))}
        </SearchSelect>
      </Flex>
    </FlexBetween>
  );
};

export default SecondSection;
