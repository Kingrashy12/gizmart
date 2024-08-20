import { Flex } from "@tremor/react";
import React, { useEffect, useState } from "react";
import CollectionPageHeader from "../indicator/CollectionPageHeader";
import StatusCard from "./StatusCard";
import OrderTabs from "./OrderTabs";
import OrderCard from "../card/order/OrderCard";
import { No_Products_Found, Paragraph, RequestError } from "@/lib";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { OrdersWrapperClass } from "./class";
import { RiRestartLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { getOrders } from "@/redux/thunks/order";

const OrdersContainer = () => {
  const orderState = useAppSelector((state) => state.order);
  const orders = orderState.orders;
  const fetchedError = orderState.fetchError;
  const hasFailed = orderState.fetchStatus === "failed";
  const isfetching = orderState.fetchStatus === "pending";
  const userId = useAppSelector((state) => state.auth.userId);
  const { onClose, onOpen, initializeAutoOpen } = useBackgroundLoader();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (orders.length < 1) {
      dispatch(getOrders(userId));
    }
  }, []);

  useEffect(() => {
    if (isfetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isfetching]);

  const [tab, setTab] = useState("pending");

  const filteredOrder = orders.filter((order) => order.status === tab);
  return (
    <Flex className="flex-col mt-6 max-[480px]:gap-5">
      <CollectionPageHeader label="Orders" className="w-full" />
      {hasFailed ? (
        <Flex className="items-center justify-center mb-5 mt-2">
          <RequestError
            message={fetchedError}
            hasButton
            buttonLabel="Refresh"
            buttonLabelIcon={RiRestartLine}
            buttonLabelClick={() => router.reload()}
          />
        </Flex>
      ) : (
        <Flex className={OrdersWrapperClass}>
          <OrderTabs setTab={setTab} orders={orders} tab={tab} />
          {orders.length < 1 ? (
            <No_Products_Found message="You have no order" />
          ) : filteredOrder.length < 1 ? (
            <Paragraph fontPoppins>
              You don&apos;t have any{" "}
              {tab.slice(0, 1).toUpperCase() + tab.slice(1)} order
            </Paragraph>
          ) : (
            filteredOrder.map((order, index) => (
              <OrderCard order={order} key={index} />
            ))
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default OrdersContainer;
