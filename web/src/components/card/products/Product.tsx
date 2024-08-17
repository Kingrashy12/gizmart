import CustomButton from "@/components/CustomButton";
import { Discount } from "@/lib";
import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import { RiShoppingCartFill } from "@remixicon/react";
import { Icon } from "@tremor/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import CartButton from "./CartButton";
import { useAppSelector } from "@/hooks/store";
import { Display_product_class } from "../class";
import OutOfStock from "@/components/indicator/OutOfStock";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const truncateName =
    product.name.length > 50 ? product.name.slice(0, 50) + "..." : product.name;
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`${Display_product_class}`}
    >
      {product.quantity === 0 ? <OutOfStock /> : null}
      <div className="bg-ProductBg/ collection_bg p-1 w-full h-[150px] justify-center rounded-lg flex items-center max-[1024px]:w-[160px] max-[700px]:w-[150px] max-[700px]:h-[125px]">
        {/* <Discount value={25} className="right-6" /> */}
        <Image
          src={product.images[0].url}
          className={`max-[700px]:w-[90px] max-[700px]:h-[90px] rounded-md`}
          width={120}
          height={120}
          alt={product.name}
        />
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`${poppinsFont.className} font-bold text-lg max-[700px]:text-sm`}
        >
          ₦ {product.price.toLocaleString()}
        </span>
      </div>
      <p
        className={`${robotoFont.className} text-sm font-normal w-full h-full relative`}
      >
        {truncateName}
      </p>
      <Link
        href={`/?${product.userId === userId ? "edit" : "add-to-cart"}=${
          product.slug
        }`}
        className="p-1 w-full"
      >
        <CartButton product={product} />
      </Link>
    </Link>
  );
};

export default Product;
