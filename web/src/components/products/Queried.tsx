import React from "react";
import Wrapper from "../card/Wrapper";
import { HeaderOne, Flex, Paragraph, Not_Found } from "@/lib";
import All_Product from "../card/products/All_Product";
import { RiArrowLeftLine } from "@remixicon/react";

interface QueriedProps {
  products: ProductType[];
  query: string | any;
}

const Queried = ({ products, query }: QueriedProps) => {
  const q = query
    .split(" ")
    .map(
      (name: string) =>
        name.toUpperCase().slice(0, 1) + name.slice(1).replace(/[-]/g, " ")
    );
  return (
    <Wrapper className="flex-col flex">
      <Flex className="flex-col gap-5 py-4 px-4 max-[480px]:p-0">
        <HeaderOne
          fontPoppins
          fontWeight="semi-bold"
          className="text-2xl max-[480px]:text-lg"
        >
          Result for: {q}
        </HeaderOne>
        <Flex className="gap-2 flex-wrap">
          {products.length < 1 ? (
            <Not_Found
              label={`No Result found!`}
              subLabel={`Unfortunately we couldn't find any product for ${q}.`}
              buttonLabel="Return to homepage"
              buttonHasLink
              buttonUrl="/"
              buttonIcon={RiArrowLeftLine}
              hasButton
            />
          ) : (
            products.map((product, index) => (
              <All_Product product={product} key={index} />
            ))
          )}
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Queried;
