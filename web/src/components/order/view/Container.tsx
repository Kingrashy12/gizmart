import Wrapper from "@/components/card/Wrapper";
import { Flex, HeaderOne } from "@/lib";
import { useRouter } from "next/router";
import React from "react";
import { TbArrowLeft } from "react-icons/tb";
import Order from "./Order";
import Payment_Info from "./Payment_Info";

const Container: React.FC<{ order: OrderType }> = ({ order }) => {
  const router = useRouter();
  return (
    <Wrapper className="flex flex-col px-0 py-0 w-full h-auto">
      <Flex className="items-center gap-2 p-2 border-b max-[480px]:py-3 max-[480px]:px-1">
        <TbArrowLeft
          onClick={() => router.back()}
          size={30}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <HeaderOne fontPoppins className="font-medium text-lg">
          Order Details
        </HeaderOne>
      </Flex>
      <Flex className="flex-col gap-4 p-4 max-[480px]:p-2">
        <Order order={order} />
        <Payment_Info order={order} />
      </Flex>
    </Wrapper>
  );
};

export default Container;
