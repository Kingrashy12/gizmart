import { Iphone14 } from "@/assets/products";
import CustomIcon from "@/components/icons/CustomIcon";
import Arrow from "@/components/indicator/Arrow";
import Title from "@/components/indicator/Title";
import { CurrentProps } from "@/components/products/Current";
import {
  Divider,
  Flex,
  FlexBetween,
  HeightDivider,
  Paragraph,
  StaticImage,
} from "@/lib";
import { formatToK } from "@/utils";
import { RiVerifiedBadgeFill, RiVerifiedBadgeLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

const SellersProfileCard = ({ product }: CurrentProps) => {
  const listing = product.sellerTotalProducts;
  const rating = 1257;
  return (
    <Flex className="collection_bg rounded-lg flex-col">
      <Link href={`/giz/seller/${product.sellerSlug}`}>
        <FlexBetween className="items-center px-6 py-1">
          <Paragraph fontPoppins fontWeight="medium">
            Seller profile
          </Paragraph>
          <Arrow
            type="normal"
            position="right"
            size="lg"
            className="text-black"
          />
        </FlexBetween>
      </Link>
      <Divider />
      <FlexBetween className="p-6 max-[480px]:p-3 max-[480px]:flex-col max-[480px]:gap-4">
        <Flex removeFullWidth className="items-center gap-2">
          <StaticImage
            src={product.sellerProfile.url}
            alt="Seller"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <Paragraph fontPoppins fontWeight="semi-bold">
            {product?.sellerName}
          </Paragraph>
          <CustomIcon
            hasTitle
            icon={RiVerifiedBadgeLine}
            iconSize="md"
            title="Verified seller"
            titleWidth="100px"
            iconClass="text-primaryColor"
            className={product.isSellerVerified ? "-translate-x-3" : "hidden"}
          />
        </Flex>
        {/* <HeightDivider className="h-auto" />
        <Flex removeFullWidth className="flex-col w-auto">
          <Paragraph className="text-xl" fontPoppins fontWeight="semi-bold">
            {formatToK(listing)}
          </Paragraph>
          <Paragraph
            className="text-sm text-neutral-400"
            fontPoppins
            fontWeight="medium"
          >
            Products
          </Paragraph>
        </Flex> */}
        {/* <HeightDivider className="h-auto" />
        <Flex removeFullWidth className="flex-col w-auto">
          <Paragraph className="text-xl" fontPoppins fontWeight="semi-bold">
            {formatToK(rating)}
          </Paragraph>
          <Paragraph
            className="text-sm text-neutral-400"
            fontPoppins
            fontWeight="medium"
          >
            Positive ratings
          </Paragraph>
        </Flex> */}
      </FlexBetween>
    </Flex>
  );
};

export default SellersProfileCard;
