import React, { useEffect } from "react";
import { FlexBetween, Flex, Divider } from "@/lib";
import ImageCard from "../card/products/ImageCard";
import DetailsCard from "../card/products/DetailsCard";
import Description from "../card/products/Description";
import RelatedProducts from "../card/products/RelatedProducts";
import SameBrand from "../card/products/SameBrand";
import { useAppSelector } from "@/hooks/store";
import { fetchProduct } from "@/helper/fetch.action";

export interface CurrentProps {
  product: ProductType;
}

const Current = ({ product }: CurrentProps) => {
  const user = useAppSelector((state) => state.auth);

  async function handleView() {
    await fetchProduct(product.slug, user.userId);
  }

  useEffect(() => {
    if (product && user.userLoaded) {
      handleView();
    }
  }, [product]);
  return (
    <div className="flex flex-col w-full relative gap-3 h-full max-[480px]:mt-5">
      <FlexBetween className="max-[960px]:flex-col max-[960px]:gap-3 items-center">
        <ImageCard product={product} />
        <DetailsCard product={product} />
      </FlexBetween>
      <Divider />
      <Flex className="flex-col gap-5">
        <Description product={product} />
        <Divider />
        <RelatedProducts product={product} />
        <SameBrand product={product} />
      </Flex>
    </div>
  );
};

export default Current;
