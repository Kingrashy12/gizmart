import { Flex, Paragraph } from "@/lib";
import React from "react";

const Payment_Info: React.FC<{ order: OrderType }> = ({ order }) => {
  function calTotal() {
    let products: ProductType[] = [];
    order.eachQuantity.forEach((id) => {
      const p = order.products.filter((product) => id === product._id);
      products.push(...p);
    });
    const price = products.reduce((a: any, b) => a + b.price, 0);
    return price;
  }
  function calFees() {
    let products: ProductType[] = [];
    order.eachQuantity.forEach((id) => {
      const p = order.products.filter((product) => product._id === id);
      products.push(...p);
    });
    const fees = products.reduce((a: any, b) => a + b.delivery_fee, 0);
    return fees;
  }
  function totalOrder() {
    const total: number = calTotal() + calFees();
    return total;
  }
  return (
    <div className="flex flex-col border border-neutral-300 rounded-lg w-[300px]">
      <Paragraph
        fontInter
        className="font-medium p-3 text-sm border-b border-b-neutral-300 uppercase"
      >
        Payment Information
      </Paragraph>
      <Flex className="p-3 flex-col gap-6">
        <Flex className="flex-col gap-1">
          <Paragraph fontPoppins className="text-sm font-medium">
            Payment Method
          </Paragraph>
          <Paragraph fontInter className="text-neutral-400 text-xs font-normal">
            {order.payment_method}
          </Paragraph>
        </Flex>
        <Flex className="flex-col gap-1">
          <Paragraph fontPoppins className="text-sm font-medium">
            Payment Details
          </Paragraph>
          <Paragraph fontInter className="text-neutral-400 text-xs font-normal">
            Items total: ₦ {calTotal()?.toLocaleString()}
          </Paragraph>
          <Paragraph fontInter className="text-neutral-400 text-xs font-normal">
            Delivery Fees: ₦ {calFees()?.toLocaleString()}
          </Paragraph>
          <Paragraph fontInter className="text-neutral-400 text-xs font-normal">
            Total: ₦ {totalOrder()?.toLocaleString()}
          </Paragraph>
        </Flex>
      </Flex>
    </div>
  );
};

export default Payment_Info;
