import { Flex, Paragraph } from "@/lib";
import React from "react";
import { IoMdBookmark } from "react-icons/io";

const NoItems = () => {
  return (
    <Flex className="flex-col items-center justify-center p-3 mt-3">
      <IoMdBookmark size={80} className="text-neutral-400" />
      <Paragraph fontPoppins className="text-neutral-500 font-medium text-base">
        You don&apos;t have any saved products
      </Paragraph>
    </Flex>
  );
};

export default NoItems;
