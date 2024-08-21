import { Flex, HeaderTwo, Paragraph } from "@/lib";
import { RiCoupon3Fill } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React from "react";
import { BiSolidCoupon } from "react-icons/bi";
import CustomButton from "../CustomButton";
import Link from "next/link";

const No_Voucher = () => {
  return (
    <Flex className="flex-col p-6 items-center justify-center gap-5">
      <div className="v_icon w-[150px] h-[150px] rounded-full p-3 flex items-center justify-center">
        <RiCoupon3Fill size={80} className="text-primaryColor v_icon_rotate" />
      </div>
      <HeaderTwo fontPoppins className="text-lg font-semibold text-center">
        You currently have no available Voucher
      </HeaderTwo>
      <Paragraph fontPoppins className="text-neutral-400 text-sm text-center">
        All your available Vouchers will be displayed here
      </Paragraph>
      <Link href="/">
        <CustomButton variant="primary">Continue Shopping</CustomButton>
      </Link>
    </Flex>
  );
};

export default No_Voucher;
