import { Discount } from "@/lib";
import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import { RiShoppingCartFill } from "@remixicon/react";
import { Icon } from "@tremor/react";
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

  return (
    <Link href={`/product/${product.slug}`} className={All_Product_Link_Class}>
      {product.quantity === 0 ? <OutOfStock /> : null}
      <div className={All_Product_Class}>
        {/* <Discount value={25} className="right-6" /> */}
        <Image
          src={product.images[0].url}
          width={120}
          height={120}
          className={`w-[120px] h-[120px] max-[700px]:w-[90px] max-[700px]:h-[90px] rounded-md`}
          alt={product.name}
        />
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`${poppinsFont.className} font-bold text-lg max-[700px]:text-base max-[1024px]:text-base`}
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
