import React from "react";
import Wrapper from "../card/Wrapper";
import { Flex, HeaderOne } from "@/lib";
import { useAppSelector } from "@/hooks/store";
import NoItems from "./saved/NoItems";
import ItemCard from "./saved/ItemCard";

const SavedProducts = () => {
  const savedState = useAppSelector((state) => state.saved);
  const products = savedState.items;
  const empty = products.length < 1;

  return (
    <Wrapper className="flex flex-col gap-3 w-full">
      <HeaderOne fontPoppins className="text-lg font-medium">
        Saved Products
      </HeaderOne>
      <Flex className="flex-wrap gap-3">
        {empty ? (
          <NoItems />
        ) : (
          products.map((product, index) => (
            <ItemCard key={index} product={product} />
          ))
        )}
      </Flex>
    </Wrapper>
  );
};

export default SavedProducts;
