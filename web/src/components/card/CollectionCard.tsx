import { HeadPhone } from "@/assets";
import { poppinsFont } from "@/lib/fonts/font";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { Bounce, Rotate, Zoom } from "react-awesome-reveal";

interface CardProps {
  url: string;
  label: string;
  imageSrc: string | StaticImageData | any;
  className?: React.CSSProperties;
  direction: "right" | "left" | "up" | "down";
}

const CollectionCard = ({
  url,
  label,
  className,
  imageSrc,
  direction,
}: CardProps) => {
  return (
    <Link href={url} className="flex flex-col gap-3 items-center">
      {/* <Zoom> */}
      <div className="collection_bg p-5 rounded-xl h-40 justify-center flex items-center max-[1024px]:w-[140px] max-[480px]:w-[90px] max-[480px]:h-[90px]">
        <Image
          alt="Card"
          src={imageSrc}
          className="w-[100px] h-[100px] max-[480px]:w-[70px] max-[480px]:h-[60px]"
        />
      </div>
      <p className={`${poppinsFont.className} font-medium text-xs`}>{label}</p>
      {/* </Zoom> */}
    </Link>
  );
};

export default CollectionCard;
