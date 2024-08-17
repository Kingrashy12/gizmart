import React from "react";
import Wrapper from "../Wrapper";
import { Flex, FlexBetween, Paragraph, StaticImage } from "@/lib";
import { StaticImageData } from "next/image";
import { Badge } from "@tremor/react";
import Link from "next/link";
import { formatTime } from "@/utils";
import { Appcolors } from "@/styles/global";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const currentWidth = global?.window?.innerWidth;
  const mobile = currentWidth <= 1024;
  const name = order.products[0].name;
  const lg = name.length > 80 ? name.slice(0, 80) + "..." : name;
  const xl = name.length > 100 ? name.slice(0, 100) + "..." : name;
  const tabName = mobile ? lg : xl;
  const pending = order.status === "pending";
  const successful = order.status === "completed";
  const processing = order.status === "processing";

  const BadgeColor = pending
    ? "blue"
    : processing
    ? "yellow"
    : successful
    ? "green"
    : "red";
  return (
    <Link href={`/orders/${order.slug}`} className="w-full">
      <Wrapper className="w-full flex items-center gap-3 rounded-lg max-[480px]:flex-col">
        <StaticImage
          src={order.products[0].images[0]?.url}
          alt="Order"
          className="w-36"
          width={144}
          height={144}
        />
        <Flex className="flex-col gap-3">
          <Paragraph fontRoboto className="font-medium text-xl">
            {tabName}
          </Paragraph>

          <Paragraph fontPoppins className="text-neutral-400">
            Order #{order.orderNumber}
          </Paragraph>
          <Badge className="p-1" color={BadgeColor}>
            {order.status.slice(0, 1).toUpperCase() + order.status.slice(1)}
          </Badge>
          <Paragraph
            fontPoppins
            className="text-sm font-medium text-neutral-600"
          >
            {formatTime(order.createdAt, "dd MMMM yyyy")}
          </Paragraph>
        </Flex>
      </Wrapper>
    </Link>
  );
};

export default OrderCard;
