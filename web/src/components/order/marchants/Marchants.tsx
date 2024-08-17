import Wrapper from "@/components/card/Wrapper";
import OrderTable from "@/components/table/OrderTable";
import SellerProductsTable from "@/components/table/SellProductsTable";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  Flex,
  FlexBetween,
  HeaderOne,
  No_Products_Found,
  Paragraph,
  RequestError,
} from "@/lib";
import { getMarchantsOrder } from "@/redux/thunks/order";
import { Divider } from "@tremor/react";
import router from "next/router";
import React, { useEffect } from "react";
import { GoChecklist } from "react-icons/go";

const Marchants = () => {
  const orderState = useAppSelector((state) => state.order);
  const marchantsId = useAppSelector((state) => state.auth.userId);
  const noOrders = orderState.marchants.length < 1;
  const isFetching = orderState.fetchMarchantsStatus === "pending";
  const hasFailed = orderState.fetchMarchantsStatus === "failed";
  const { onClose, onOpen } = useBackgroundLoader();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (orderState.marchants.length < 1) {
    dispatch(getMarchantsOrder(marchantsId));
    // }
  }, []);

  useEffect(() => {
    if (isFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isFetching]);

  return (
    <Wrapper className="w-full flex flex-col p-1 rounded-lg gap-3">
      <FlexBetween>
        <HeaderOne
          fontPoppins
          className="font-semibold text-2xl max-[480px]:text-xl"
        >
          Order Management
        </HeaderOne>
      </FlexBetween>
      <Divider />
      {hasFailed ? (
        <RequestError
          message={orderState.fetchMarchantError}
          hasButton
          buttonLabel="Refresh"
          buttonLabelClick={() => router.reload()}
        />
      ) : noOrders ? (
        <Flex className="flex-col gap-4 items-center justify-center">
          <GoChecklist size={50} />
          <Paragraph fontPoppins>You have not received any orders.</Paragraph>
        </Flex>
      ) : (
        <OrderTable order={orderState?.marchants} />
      )}
    </Wrapper>
  );
};

export default Marchants;
