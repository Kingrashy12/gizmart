import {
  All_Product_Class,
  All_Product_Link_Class,
} from "@/components/card/class";
import CartButton from "@/components/card/products/CartButton";
import OutOfStock from "@/components/indicator/OutOfStock";
import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { IconWrap } from "@/components";
import { saveProduct } from "@/redux/savedProductSlice";

const ItemCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const products = useAppSelector((state) => state.saved.items);
  const is_saved = products.find((p) => p._id === product._id);

  const router = useRouter();
  const truncateName =
    product.name.length > 50 ? product.name.slice(0, 50) + "..." : product.name;
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  function unsave(event: React.ChangeEvent) {
    event.preventDefault();
    dispatch(saveProduct(product));
  }

  return (
    <Link href={`/product/${product.slug}`} className={All_Product_Link_Class}>
      <div
        onClick={(e) => e.preventDefault()}
        className="flex items-center justify-center absolute bg-black p-[5px] rounded-tr-md rounded-bl-md right-0 top-0 hover:opacity-75"
      >
        <IconWrap
          size={25}
          className=" cursor-pointer text-primaryColor"
          useCustom
          Icon={is_saved ? MdBookmark : MdBookmarkBorder}
          onClick={unsave}
        />
      </div>
      {product.quantity === 0 ? <OutOfStock /> : null}
      <div className={All_Product_Class}>
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

export default ItemCard;
