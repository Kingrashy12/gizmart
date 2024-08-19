import { CurrentProps } from "@/components/products/Current";
import {
  Divider,
  Flex,
  FlexBetween,
  HeaderOne,
  HeightDivider,
  Paragraph,
} from "@/lib";
import {
  RiEyeLine,
  RiLineChartLine,
  RiStarFill,
  RiStarLine,
} from "@remixicon/react";
import { Icon } from "@tremor/react";
import Link from "next/link";
import React, { useState } from "react";
import SellersProfileCard from "../user/SellersProfileCard";
import { formatToK } from "@/utils";
import CustomIcon from "@/components/icons/CustomIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { IconWrap } from "@/components";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { saveProduct } from "@/redux/savedProductSlice";

const DetailsCard = ({ product }: CurrentProps) => {
  const [favourite, setFavourite] = useState(false);
  const brandName =
    product.brand.slice(0, 1).toUpperCase() + product.brand.slice(1);
  const views = product.views.length;
  // const views = 123675000;
  const dispatch = useAppDispatch();
  const savedState = useAppSelector((state) => state.saved);
  const saved = savedState.items.find((item) => item._id === product._id);

  return (
    <Flex className="flex-col gap-3 max-[480px]:p-2">
      <FlexBetween className="items-center">
        <HeaderOne
          fontPoppins
          fontWeight="bold"
          className="text-3xl max-[480px]:text-2xl"
        >
          ₦ {product.price?.toLocaleString()}
        </HeaderOne>
        <IconWrap
          size={35}
          className=" cursor-pointer text-primaryColor p-1 hover:bg-neutral-100 rounded-lg"
          useCustom
          Icon={saved ? MdBookmark : MdBookmarkBorder}
          onClick={() => dispatch(saveProduct(product))}
        />
      </FlexBetween>
      <Paragraph fontRoboto className="text-xl" fontWeight="medium">
        {product.name}
      </Paragraph>
      <Flex className="gap-3 items-center flex-wrap" removeFullWidth>
        {/* <Flex className="items-center w-auto" removeFullWidth>
          <Icon icon={RiStarFill} size="md" className="text-primaryColor" />
          <Paragraph
            fontPoppins
            fontWeight="semi-bold"
            className="text-base translate-y-[1px]"
          >
            4.8
          </Paragraph>
        </Flex>
        <HeightDivider /> */}
        <Paragraph fontRoboto fontWeight="normal" className="w-auto">
          Brand:{" "}
          <Link
            href={`/brand/${product.brand}/`}
            className="text-blue-500 hover:underline"
          >
            {brandName}
          </Link>
        </Paragraph>
        <HeightDivider />
        <Flex className="items-center" removeFullWidth>
          <CustomIcon
            icon={RiEyeLine}
            iconClass="text-black"
            iconSize="md"
            hasTitle
            title="Views"
          />
          <Paragraph
            fontRoboto
            fontWeight="semi-bold"
            className="w-auto flex items-center text-sm"
          >
            {formatToK(views)}
          </Paragraph>
        </Flex>
        <HeightDivider />
        <Flex className="items-center cursor-pointer" removeFullWidth>
          <Icon icon={RiLineChartLine} size="md" className="text-black" />
          <Paragraph fontRoboto fontWeight="medium">
            View price history
          </Paragraph>
        </Flex>
      </Flex>
      <Divider />
      <SellersProfileCard product={product} />
    </Flex>
  );
};

export default DetailsCard;
