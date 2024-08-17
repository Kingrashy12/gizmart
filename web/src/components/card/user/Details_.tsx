import React from "react";
import Wrapper from "../Wrapper";
import { Flex, Paragraph } from "@/lib";
import { MdLocationOn } from "react-icons/md";

const Details_ = () => {
  return (
    <Wrapper className="flex flex-col w-full">
      <Flex className="items-center">
        <MdLocationOn size={18} />
        <Paragraph fontRoboto className="text-sm font-medium">
          Lagos
        </Paragraph>
      </Flex>
    </Wrapper>
  );
};

export default Details_;
