import { Flex, HeaderOne, Paragraph, StaticImage } from "@/lib";
import { nairaSym } from "@/styles/global";
import React from "react";
import Cart_Button from "./Cart_Button";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "@/hooks/store";
import { removeItem } from "@/redux/cartSlice";

interface CartProductProp {
  product: ProductType;
}

const CartProduct = ({ product }: CartProductProp) => {
  const dispatch = useAppDispatch();
  const currentWidth = global?.window?.innerWidth;
  const mobile = currentWidth <= 480;
  const productName =
    product.name.length > 90 ? product.name.slice(0, 90) + "..." : product.name;
  const mobileName =
    product.name.length > 90 ? product.name.slice(0, 55) + "..." : product.name;

  function removeFromCart() {
    dispatch(removeItem(product));
  }
  return (
    <div className="flex flex-col relative">
      <div
        className="bg-black cursor-pointer hover:opacity-75 left-0 p-1 z-50 text-white rounded-br-lg rounded-tl-md flex items-center justify-center absolute"
        onClick={removeFromCart}
      >
        <IoClose size={25} />
      </div>
      <Flex className="border-b-[18px] border-b-softGray text-black px-2 py-1 justify-between gap-2 max-[350px]:flex-col/">
        <Flex className="gap-2 max-[350px]:flex-col">
          <StaticImage
            src={product.images[0].url}
            alt={product.name}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-1 justify-between">
            <Paragraph fontRoboto className="font-medium">
              {mobile ? mobileName : productName}
            </Paragraph>
            <HeaderOne
              fontPoppins
              className="flex font-bold text-lg select-none"
            >
              <p dangerouslySetInnerHTML={{ __html: nairaSym }} />
              {product.price?.toLocaleString()}
            </HeaderOne>
          </div>
        </Flex>
        <Cart_Button product={product} />
      </Flex>
    </div>
  );
};

export default CartProduct;
