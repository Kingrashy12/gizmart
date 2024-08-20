import { Discount } from "@/lib";
import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import { RiShoppingCartFill } from "@remixicon/react";
import { BadgeDelta, Icon } from "@tremor/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { All_Product_Class, All_Product_Link_Class } from "../class";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import CartButton from "./CartButton";
import { useAppSelector } from "@/hooks/store";
import OutOfStock from "@/components/indicator/OutOfStock";

interface ProductProps {
  product: ProductType;
}

const All_Product = ({ product }: ProductProps) => {
  const router = useRouter();
  const truncateName =
    product.name.length > 50 ? product.name.slice(0, 50) + "..." : product.name;
  const userId = useAppSelector((state) => state.auth.userId);

  const getPercentage = () => {
    if (product.formalPrice) {
      const New: any = product.price;
      const old = product.formalPrice;
      const res = New - old;
      const percentage = (res / old) * 100;
      const inc = percentage >= 1;

      if (inc) {
        return (
          <BadgeDelta
            deltaType={inc ? "moderateIncrease" : "moderateDecrease"}
            isIncreasePositive={true}
            size="sm"
            className="absolute top-0 right-0 rounded-tr-md rounded-bl-md rounded-br-none rounded-tl-none"
          >
            {inc ? "+" : null}
            {percentage.toFixed(1)}%
          </BadgeDelta>
        );
      } else {
        return (
          <Discount
            value={`${percentage.toFixed(1)}%`}
            className="right-0 top-0 w-auto p-1"
          />
        );
      }
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className={All_Product_Link_Class}>
      {product.quantity === 0 ? <OutOfStock /> : null}
      <div className={All_Product_Class}>
        {getPercentage()}
        <Image
          src={product.images[0].url}
          width={120}
          height={120}
          className={`w-[120px] h-[120px] max-[700px]:w-[90px] max-[700px]:h-[90px] rounded-md`}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`${poppinsFont.className} font-bold text-lg max-[700px]:text-base max-[1024px]:text-base`}
        >
          ₦ {product.price.toLocaleString()}
        </span>
        <span
          className={`${poppinsFont.className} ${
            !product.formalPrice && "hidden"
          } font-medium max-[550px]:text-xs text-neutral-500 text-sm line-through`}
        >
          ₦ {product?.formalPrice?.toLocaleString()}
        </span>
      </div>
      <p
        className={`${robotoFont.className} text-sm font-normal w-full h-full relative`}
      >
        {truncateName}
      </p>
      <Link
        href={`${router.pathname}?${
          product.userId === userId ? "edit" : "add-to-cart"
        }=${product.slug}`}
        className="p-1"
      >
        <CartButton product={product} />
      </Link>
    </Link>
  );
};

export default All_Product;
