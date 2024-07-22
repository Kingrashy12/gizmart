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

export type ProductType = {
  name: string;
  price: number | string | any;
  image: StaticImageData | string;
  brand: string;
  slug: string;
};

interface ProductProps {
  product: ProductType;
}

const All_Product = ({ product }: ProductProps) => {
  const truncateName =
    product.name.length > 50 ? product.name.slice(0, 50) + "..." : product.name;
  const slug = product.name
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/\--/g, "-");

  function addToCart() {
    toast.success(`Add to cart`);
  }

  return (
    <Link href={`/product/${product.slug}`} className={All_Product_Link_Class}>
      <div className={All_Product_Class}>
        <Discount value={25} className="right-6" />
        <Image
          src={product.image}
          className={`w-[120px] h-[120px] max-[700px]:w-[90px] max-[700px]:h-[90px]`}
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
      <Link href={`/?add-to-cart=${slug}`} className="p-1">
        <CustomButton
          className="w-full"
          variant="primary"
          onClick={(e) => {
            e?.preventDefault();
            addToCart();
          }}
        >
          Add to cart
        </CustomButton>
      </Link>
    </Link>
  );
};

export default All_Product;
