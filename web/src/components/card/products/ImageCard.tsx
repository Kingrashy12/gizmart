import ActiveView from "@/components/indicator/ActiveView";
import Arrow from "@/components/indicator/Arrow";
import { CurrentProps } from "@/components/products/Current";
import { Flex, StaticImage } from "@/lib";
import React, { useState } from "react";
import CartButton from "./CartButton";
import OutOfStock from "@/components/indicator/OutOfStock";

const ImageCard = ({ product }: CurrentProps) => {
  const items = product.images;
  const [currentImage, setCurrentImage] = useState<any>(items[0]);

  function scrollRight() {
    setCurrentImage((prev: any) => {
      const currentIndex = items.indexOf(prev);
      const nextIndex = (currentIndex + 1) % items.length;
      return items[nextIndex];
    });
  }
  function scrollLeft() {
    setCurrentImage((prev: any) => {
      const currentIndex = items.indexOf(prev);
      if (currentIndex === 0) {
        return items[currentIndex];
      } else {
        const nextIndex = (currentIndex - 1) % items.length;
        return items[nextIndex];
      }
    });
  }
  return (
    <Flex
      className={`flex-col items-center gap-5 ${
        product.quantity === 0 ? "opacity-70" : ""
      }`}
    >
      {product.quantity === 0 ? <OutOfStock /> : null}
      <Flex className="items-center justify-center">
        <Arrow
          position="left"
          type="fixed-scroll"
          size="lg"
          onClick={scrollLeft}
          className={items.length === 1 ? "hidden" : ""}
        />
        <StaticImage
          src={currentImage.url}
          alt={product.name}
          className="w-[330px] h-[330px] max-[480px]:w-[250px] max-[480px]:h-[250px] rounded-[16px]"
          width={330}
          height={330}
        />
        <Arrow
          position="right"
          type="fixed-scroll"
          size="lg"
          onClick={scrollRight}
          className={items.length === 1 ? "hidden" : ""}
        />
      </Flex>
      <Flex
        className={`${
          items.length === 1 ? "hidden" : "flex"
        } w-full gap-3 items-center justify-center`}
      >
        {items.map((i, index) => (
          <ActiveView
            key={index}
            isactive={i === currentImage}
            onClick={() => setCurrentImage(items[index])}
          />
        ))}
      </Flex>
      <Flex className="items-center w-1/2" removeFullWidth>
        <CartButton product={product} />
      </Flex>
    </Flex>
  );
};

export default ImageCard;
