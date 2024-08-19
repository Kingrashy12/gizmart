import React, { useState } from "react";
import Wrapper from "../card/Wrapper";
import { Divider, Flex, FlexBetween, HeaderOne } from "@/lib";
import { Tab, TabGroup, TabList } from "@tremor/react";
import CustomButton from "../CustomButton";
import { RiAiGenerate, RiEyeLine } from "@remixicon/react";
import No_Voucher from "./No_Voucher";
import { useGenVoucherModal } from "@/context/useGenVoucher";
import { useAppSelector } from "@/hooks/store";
import { useVouchers } from "@/context/useVouchers";

const Vouchers = () => {
  const [tab, setTab] = useState("active");
  const { onOpen } = useGenVoucherModal();
  const user = useAppSelector((state) => state.auth);
  const { onOpen: openVoucher } = useVouchers();
  return (
    <Wrapper className="flex flex-col w-full p-0">
      <FlexBetween className="mb-2">
        <HeaderOne
          fontRoboto
          className="font-semibold text-xl max-[480px]:text-lg"
        >
          Voucher
        </HeaderOne>
        <div className={user.isAdmin ? "gap-3 items-center flex" : "hidden"}>
          <CustomButton onClick={onOpen} icon={RiAiGenerate} variant="primary">
            Generate
          </CustomButton>
          <CustomButton
            onClick={openVoucher}
            icon={RiEyeLine}
            variant="secondary"
          >
            View
          </CustomButton>
        </div>
      </FlexBetween>
      <Divider />
      <Flex className="border-b border-b-neutral-300 p-2">
        <TabGroup>
          <TabList variant="solid" color="yellow">
            <Tab value="active">ACTIVE</Tab>
            <Tab value="inactive">INACTIVE</Tab>
          </TabList>
        </TabGroup>
      </Flex>
      <No_Voucher />
    </Wrapper>
  );
};

export default Vouchers;
