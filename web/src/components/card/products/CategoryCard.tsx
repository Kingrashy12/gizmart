import {
  audioCategories,
  gamingCategories,
  laptopCategories,
  phonesCategories,
} from "@/data/category";
import { Flex, HeaderOne, Paragraph, StaticImage } from "@/lib";
import { CategoryType } from "@/types/app";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface CategoryProps {
  category: string;
  url: string | any;
  image: StaticImageData | any;
}

const CategoryCard = ({ header }: CategoryType) => {
  const path = useRouter();
  const { category } = path.query;
  const query = category;
  const [categories, setCategories] = useState<CategoryProps[] | any[]>([]);

  useEffect(() => {
    if (query === "phones-and-tablets") {
      setCategories(phonesCategories);
    } else if (query === "audio") {
      setCategories(audioCategories);
    } else if (query === "gaming") {
      setCategories(gamingCategories);
    } else if (query === "laptops") {
      setCategories(laptopCategories);
    }
  }, [query]);

  return (
    <Flex className="flex-col collection_bg rounded-2xl h-64 max-[768px]:h-auto">
      <HeaderOne
        fontPoppins
        fontWeight="semi-bold"
        className="bg-ProductHeader p-3 text-center rounded-t-2xl"
      >
        {header ? header : "Shop by Category"}
      </HeaderOne>
      <Flex className="gap-8 p-6 justify-center items-center max-[768px]:flex-wrap max-[768px]:items-start">
        {categories.map((cat, index) => (
          <Link
            className="flex flex-col items-center gap-3"
            href={cat.url}
            key={index}
          >
            <div className="p-2 bg-ProductHeader flex items-center justify-center rounded-md w-[120px] h-[120px]">
              <StaticImage
                src={cat.image}
                className="w-[90px] h-[90px]"
                alt={cat.category}
              />
            </div>
            <Paragraph fontRoboto fontWeight="normal" className="text-sm">
              {cat.category}
            </Paragraph>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default CategoryCard;
