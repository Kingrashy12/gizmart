import { collectionsdata, productsCollection } from "@/data/category";
import { Flex, FlexBetween, Paragraph } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { Select, SelectItem } from "@tremor/react";
import React, { useEffect, useState } from "react";

type SellFormType = {
  subcategory: string;
  category: string;
  color: string;
  price: number;
  name: string;
  description: string;
  brand: string;
  quantity: number;
  images: any[];
  delivery_fee: number;
};

export interface SellProps {
  setForm: any;
  form: SellFormType;
  isCreating?: boolean;
  isDeliveryFree?: boolean;
}

const CollectionSection = ({ form, setForm, isCreating }: SellProps) => {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorydata, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    if (isCreating) {
      setSelectedCollection("");
      setSelectedCategory("");
    }
  }, [isCreating]);

  function handleCategory(value: any) {
    setSelectedCollection(value);
    setForm({ ...form, category: value });
  }
  function handleSubCategory(value: any) {
    setSelectedCategory(value);
    setForm({ ...form, subcategory: value });
  }

  useEffect(() => {
    const collection = selectedCollection;
    const phonesCol = "phones-and-tablets";
    const audioCol = "audio";
    const laptopsCol = "laptops";
    const gamingCol = "gaming";
    if (collection === phonesCol) {
      setCategoryData(productsCollection.phonesandtablets.categories);
    } else if (collection === audioCol) {
      setCategoryData(productsCollection.audio.categories);
    } else if (collection === laptopsCol) {
      setCategoryData(productsCollection.laptops.categories);
    } else if (collection === gamingCol) {
      setCategoryData(productsCollection.gaming.categories);
    }
  }, [selectedCollection]);

  return (
    <FlexBetween
      className={`${poppinsFont.className} items-center gap-3 text-black font-medium text-sm`}
    >
      <Flex className="flex-col gap-2">
        <Paragraph>Category</Paragraph>
        <Select
          placeholder="Select category"
          value={selectedCollection}
          onChange={handleCategory}
        >
          {collectionsdata.map((collection, index) => (
            <SelectItem key={index} value={collection.value}>
              {collection.label}
            </SelectItem>
          ))}
        </Select>
      </Flex>
      <Flex className="flex-col gap-2">
        <Paragraph>Subcategory</Paragraph>
        <Select
          disabled={!selectedCollection}
          placeholder="Select Subcategory"
          value={selectedCategory}
          onChange={handleSubCategory}
        >
          {categorydata.map((category, index) => (
            <SelectItem key={index} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
      </Flex>
    </FlexBetween>
  );
};

export default CollectionSection;
