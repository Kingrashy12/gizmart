import Wrapper from "@/components/card/Wrapper";
import { Flex, HeaderOne } from "@/lib";
import { useRouter } from "next/router";
import React from "react";
import { TbArrowLeft } from "react-icons/tb";
import PackageStatus from "./PackageStatus";

const PackageHistory: React.FC<{ order: OrderType }> = ({ order }) => {
  const router = useRouter();
  return (
    <Wrapper className="flex flex-col px-0 py-0 w-full h-auto rounded-lg">
      <Flex className="items-center gap-2 p-2 border-b">
        <TbArrowLeft
          onClick={() => router.back()}
          size={30}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <HeaderOne fontPoppins className="font-medium text-lg">
          Package History
        </HeaderOne>
      </Flex>
      <div className="flex-col relative flex p-5 gap-0">
        <PackageStatus order={order} />
      </div>
    </Wrapper>
  );
};

export default PackageHistory;
