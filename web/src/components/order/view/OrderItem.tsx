import { Flex, Paragraph, SetInnerHtml, StaticImage } from "@/lib";
import { inter, poppinsFont } from "@/lib/fonts/font";
import { nairaSym } from "@/styles/global";
import { formatTime } from "@/utils";
import { Badge } from "@tremor/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { CancelClass, StatusLinkClass } from "../class";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { cancelOrder } from "@/redux/thunks/order";

interface OrderItemProps {
  order: OrderType;
  product: ProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, product }) => {
  const pending = order.status === "pending";
  const successful = order.status === "completed";
  const BadgeColor = pending ? "blue" : successful ? "green" : "red";
  const qty = order.eachQuantity.filter((id) => id === product._id).length;
  const dispatch = useAppDispatch();
  const { onClose, onOpen } = useBackgroundLoader();
  const orderState = useAppSelector((state) => state.order);
  const cancelling = orderState.cancelStatus === "pending";

  useEffect(() => {
    if (cancelling) {
      onOpen();
    } else {
      onClose();
    }
  }, [cancelling]);

  return (
    <Flex className="p-4 max-[480px]:p-3 border border-neutral-200 rounded-lg">
      <Flex className="flex-col gap-3">
        <Flex className="flex-col gap-1">
          <Badge className="p-1 rounded-md text-xs" color={BadgeColor}>
            {order.status.slice(0, 1).toUpperCase() + order.status.slice(1)}
          </Badge>
          <Paragraph fontInter className="font-medium text-sm">
            Ordered on: {formatTime(order.createdAt, "dd-MMMM-yyyy")}
          </Paragraph>
        </Flex>
        <Flex className="gap-2 items-center max-[550px]:flex-col">
          <StaticImage
            src={product.images[0]?.url}
            alt={product.name}
            width={130}
            height={130}
            className="rounded-lg"
          />
          <Flex className="flex-col gap-2">
            <Paragraph>{product.name}</Paragraph>
            <div className="flex gap-1 items-center">
              <Paragraph fontInter className="text-neutral-400">
                Quantity:
              </Paragraph>
              {qty}
            </div>
            <Flex className="gap-1 items-center">
              <Paragraph
                fontInter
                className="flex items-center gap-[2px] text-base font-semibold"
              >
                <SetInnerHtml value={nairaSym} />
                {product.price.toLocaleString()}
              </Paragraph>
              {/* Add formal price here */}
            </Flex>
          </Flex>
        </Flex>
        <Link
          href={`/orders/${order.slug}/track`}
          className={`${inter.className} text-[12px] rounded-[4px] ${StatusLinkClass}`}
        >
          View Status
        </Link>
        <div
          onClick={() => dispatch(cancelOrder(order._id))}
          className={`${inter.className} text-[12px] rounded-[4px] ${
            order.status === "completed"
              ? "hidden"
              : "flex justify-center items-center"
          } ${CancelClass} hover:opacity-85`}
        >
          Cancel
        </div>
      </Flex>
    </Flex>
  );
};

export default OrderItem;
