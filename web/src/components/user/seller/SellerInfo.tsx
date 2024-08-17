import ListOff from "@/components/card/products/ListOff";
import SellerInfo_Card from "@/components/card/user/SellerInfo_Card";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, RequestError } from "@/lib";
import { getChats } from "@/redux/thunks/chats";
import { fetchSeller } from "@/redux/thunks/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface SellerInfoProps {
  pageName: string;
  sellerslug: string | any;
  // products:ProductType[]
}

const SellerInfo = ({ pageName, sellerslug }: SellerInfoProps) => {
  const userState = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.auth.userId);
  const isFetching = userState.fetch_seller_status === "pending";
  const hasFailed = userState.fetch_seller_status === "failed";
  const dispatch = useAppDispatch();
  const { onOpen, onClose } = useBackgroundLoader();
  const products = userState.seller.products;

  useEffect(() => {
    if (userState.seller.user._id) {
      console.log("Seller fetched");
    } else {
      dispatch(fetchSeller(sellerslug));
    }
  }, [sellerslug]);

  useEffect(() => {
    if (isFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isFetching]);

  useEffect(() => {
    dispatch(getChats(userId));
  }, []);

  const router = useRouter();

  return (
    <Flex className="flex-col gap-3">
      {hasFailed ? (
        <RequestError
          message={userState.fetch_seller_error}
          hasButton
          buttonLabel="Refresh"
          buttonLabelClick={() => router.reload()}
        />
      ) : (
        <>
          {userState.seller.user._id ? (
            <SellerInfo_Card user={userState.seller.user} />
          ) : null}
          {products.length >= 1 && (
            <ListOff products={products} hasProductsFound pageName={pageName} />
          )}
        </>
      )}
    </Flex>
  );
};

export default SellerInfo;
