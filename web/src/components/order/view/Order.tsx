import { Divider, Flex, Paragraph, SetInnerHtml } from "@/lib";
import { nairaSym } from "@/styles/global";
import React from "react";
import OrderItem from "./OrderItem";

const Order: React.FC<{ order: OrderType }> = ({ order }) => {
  function calTotal() {
    let products: ProductType[] = [];
    order.eachQuantity.forEach((id) => {
      const p = order.products.filter((product) => id === product._id);
      products.push(...p);
    });
    const price = products.reduce((a: any, b) => a + b.price, 0);
    const fees = products.reduce((a: any, b) => a + b.delivery_fee, 0);
    const total: number = price + fees;
    return total;
  }

  return (
    <Flex className="flex-col gap-3">
      <Paragraph fontPoppins className="font-medium text-sm">
        Order #{order.orderNumber}
      </Paragraph>
      <Flex className="gap-1 flex-col border-b pb-1 text-neutral-400">
        <Paragraph fontInter className="text-sm font-medium">
          {order.eachQuantity.length} Items
        </Paragraph>
        <Paragraph
          fontInter
          className="flex items-center gap-[2px] text-sm font-medium"
        >
          <p>Total:</p> <SetInnerHtml value={nairaSym} />
          {calTotal()?.toLocaleString()}
        </Paragraph>
      </Flex>
      <Flex className="flex-col gap-3">
        <Paragraph fontInter className="font-normal uppercase text-[15px]">
          Items Ordered
        </Paragraph>
        {order.products.map((product, index) => (
          <OrderItem key={index} order={order} product={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Order;
