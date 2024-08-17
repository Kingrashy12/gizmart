import { products } from "@/data/product";
import {
  Divider,
  Flex,
  FlexBetween,
  HeaderOne,
  HeightDivider,
  No_Products_Found,
  Paragraph,
  RequestError,
} from "@/lib";
import React, { useEffect } from "react";
import SellerProductCard from "../card/products/SellerProductCard";
import Wrapper from "../card/Wrapper";
import SellerProductsTable from "../table/SellProductsTable";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { getSellerProducts } from "@/redux/thunks/product";
import { useRouter } from "next/router";

const Seller = () => {
  const productState = useAppSelector((state) => state.product);
  const userId = useAppSelector((state) => state.auth.userId);
  const isFetching = productState.fetch_products_status === "pending";
  const hasFailed = productState.fetch_products_status === "failed";
  const { onOpen, onClose } = useBackgroundLoader();
  const noProducts = productState.seller_products?.length < 1;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isFetching]);

  useEffect(() => {
    dispatch(getSellerProducts(userId));
  }, []);

  return (
    <Wrapper className="w-full flex flex-col p-1 rounded-lg gap-3">
      <FlexBetween>
        <HeaderOne
          fontPoppins
          className="font-semibold text-2xl max-[480px]:text-xl"
        >
          Products
        </HeaderOne>
      </FlexBetween>
      <Divider />
      {noProducts ? (
        <No_Products_Found message="You don't have any active products" />
      ) : hasFailed ? (
        <RequestError
          message={productState.fetch_products_error}
          hasButton
          buttonLabel="Refresh"
          buttonLabelClick={() => router.reload()}
        />
      ) : (
        <SellerProductsTable products={productState?.seller_products} />
      )}
    </Wrapper>
  );
};

export default Seller;
