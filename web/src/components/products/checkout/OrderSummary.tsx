import { useAppSelector } from "@/hooks/store";
import {
  Divider,
  Flex,
  FlexBetween,
  HeaderOne,
  Paragraph,
  SetInnerHtml,
} from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { nairaSym } from "@/styles/global";
import React from "react";

type OrderDescType = {
  desc: string;
  isTotal?: boolean;
  price: number | string;
  className?: string;
  discounted: number;
};

const Order_Desc = ({
  desc,
  isTotal,
  discounted,
  price,
  className,
}: OrderDescType) => {
  return (
    <FlexBetween>
      <Paragraph fontPoppins className="font-medium text-sm">
        {desc}
      </Paragraph>
      {isTotal ? (
        <div className="flex flex-col">
          <HeaderOne
            fontPoppins
            className={`font-semibold text-[10px] opacity-50 ${
              discounted > 0 ? "flex" : "hidden"
            } items-center gap-[1px] line-through ${className}`}
          >
            <SetInnerHtml value={nairaSym} /> {price.toLocaleString()}
          </HeaderOne>
          <HeaderOne
            fontPoppins
            className={`font-semibold text-sm flex items-center gap-[1px] ${className}`}
          >
            <SetInnerHtml value={nairaSym} />
            {discounted > 0
              ? discounted.toLocaleString()
              : price.toLocaleString()}
          </HeaderOne>
        </div>
      ) : (
        <HeaderOne
          fontPoppins
          className={`font-semibold text-sm flex items-center gap-[1px] ${className}`}
        >
          <SetInnerHtml value={nairaSym} /> {price.toLocaleString()}
        </HeaderOne>
      )}
    </FlexBetween>
  );
};

const OrderSummary = () => {
  const orderState = useAppSelector((state) => state.order);
  const checkedOrder = orderState.check_out;
  const discountedPrice = useAppSelector(
    (state) => state.voucher.discountedPrice
  );

  const length = checkedOrder.eachQuantity.length;
  const inc = length > 1 ? "items" : "item";

  function calFee() {
    const fee = checkedOrder.products.reduce((a, p) => a + p.delivery_fee, 0);
    return fee;
  }

  function calTotal() {
    const fees = calFee();
    const totalPrice = checkedOrder.totalPrice + fees;

    return totalPrice;
  }

  return (
    <Flex className="flex-col py-3 px-5 gap-3">
      <Paragraph fontRoboto className="text-lg font-medium">
        Order summary
      </Paragraph>
      <Divider />
      <Order_Desc
        discounted={0}
        desc={`Total ${inc}: ${length}`}
        price={checkedOrder.totalPrice}
      />
      <Order_Desc
        desc="Delivery fee"
        discounted={0}
        price={calFee().toLocaleString()}
      />
      <Order_Desc
        desc="Total"
        isTotal
        discounted={discountedPrice}
        price={calTotal().toLocaleString()}
      />
    </Flex>
  );
};

export default OrderSummary;
