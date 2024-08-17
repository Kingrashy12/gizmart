import { CurrentProps } from "@/components/products/Current";
import { Flex, HeaderOne, Paragraph, Pregraph } from "@/lib";
import React from "react";

const Description = ({ product }: CurrentProps) => {
  return (
    <Flex className="flex-col collection_bg rounded-lg">
      <HeaderOne
        className="px-6 py-3 border-b border-b-neutral-300 text-lg max-[480px]:text-base"
        fontPoppins
        fontWeight="semi-bold"
      >
        Description
      </HeaderOne>
      <Flex className="flex-col px-6 py-4 w-auto">
        <Pregraph
          fontRoboto
          fontWeight="normal"
          className="w-full whitespace-pre-wrap"
        >
          {product.description}
        </Pregraph>
      </Flex>
    </Flex>
  );
};

export default Description;
