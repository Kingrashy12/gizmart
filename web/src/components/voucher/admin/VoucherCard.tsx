import CustomButton from "@/components/CustomButton";
import { Flex, Paragraph } from "@/lib";
import React from "react";
import toast from "react-hot-toast";
import { BsCopy } from "react-icons/bs";

const VoucherCard: React.FC<{ voucher: VoucherType }> = ({ voucher }) => {
  function copy(voucher: VoucherType) {
    global?.navigator.clipboard.writeText(voucher.code);
    toast.success(`Voucher copied to clipboard`);
  }

  return (
    <Flex className="p-3 border-b justify-between">
      <div className="flex items-center gap-2">
        <Paragraph fontPoppins className="font-medium text-sm">
          {voucher.code}
        </Paragraph>
        <BsCopy
          size={20}
          className=" cursor-pointer"
          onClick={() => copy(voucher)}
        />
      </div>
      <div className="flex gap-3">
        <Paragraph fontJakarta className="font-medium text-sm">
          {voucher.allowedProducts[0]}
        </Paragraph>
      </div>
      <div className="flex gap-3">
        <CustomButton variant="primary">Send</CustomButton>
        <CustomButton variant="danger">Delete</CustomButton>
      </div>
    </Flex>
  );
};

export default VoucherCard;
