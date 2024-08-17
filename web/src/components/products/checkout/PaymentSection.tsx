import { IconWrap } from "@/components";
import { useAppSelector } from "@/hooks/store";
import { Divider, Flex, Paragraph } from "@/lib";
import React, { useState } from "react";
import {
  MdAccountBalanceWallet,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import PaymentCard from "./PaymentCard";
import { FaCreditCard } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { HiCreditCard } from "react-icons/hi2";
import toast from "react-hot-toast";

type PaymentProps = {
  setPaymentMethod: any;
};

const PaymentSection = ({ setPaymentMethod }: PaymentProps) => {
  const orderState = useAppSelector((state) => state.order);
  const checkedOrder = orderState.check_out;
  const [methodOpen, setMethodOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  function onSelect(method: string, disabled: boolean) {
    const p = method.includes("card") ? "" : "Payment with";
    if (disabled) {
      toast(`${p} ${method} is not available yet.`);
    } else {
      setSelectedMethod(method);
      setPaymentMethod(method);
      setMethodOpen(false);
    }
  }

  return (
    <Flex className="flex-col p-3 drop-shadow">
      <Flex
        className={`p-2 gap-2 items-center bg-white cursor-pointer ${
          methodOpen ? "rounded-t-lg border-b-2" : "rounded-lg"
        }`}
        onClick={() => setMethodOpen(!methodOpen)}
      >
        <IconWrap
          Icon={methodOpen ? MdKeyboardArrowDown : MdKeyboardArrowRight}
          size={23}
        />
        <Paragraph fontPoppins className="font-medium text-sm">
          {selectedMethod
            ? selectedMethod.valueOf()
            : "Select a payment method"}
        </Paragraph>
      </Flex>
      {methodOpen && (
        <Flex className="flex-col gap-2 rounded-b-lg bg-softGray drop-shadow">
          <PaymentCard
            method="Balance"
            onSelect={onSelect}
            disabled
            icon={MdAccountBalanceWallet}
          />
          <Divider className="border-b-neutral-200" />
          <PaymentCard
            method="Pay with card"
            onSelect={onSelect}
            disabled
            icon={HiCreditCard}
          />
          <Divider className="border-b-neutral-200" />
          <PaymentCard
            method="Payment on delivery"
            onSelect={onSelect}
            icon={TbTruckDelivery}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default PaymentSection;
