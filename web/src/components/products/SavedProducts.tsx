import React from "react";
import Wrapper from "../card/Wrapper";
import { HeaderOne } from "@/lib";

const SavedProducts = () => {
  return (
    <Wrapper className="flex flex-col gap-3 w-full">
      <HeaderOne fontPoppins className="text-lg">
        Saved Products
      </HeaderOne>
    </Wrapper>
  );
};

export default SavedProducts;
