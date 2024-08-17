import { StaticImage } from "@/lib";
import { StaticImageData } from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { RemoveImageClass } from "../class";

interface ImageProps {
  image: StaticImageData;
  removeImage: () => void;
  index: any;
}

const SelectedImage = ({ image, removeImage, index }: ImageProps) => {
  return (
    <div className="flex flex-col relative">
      <div className={RemoveImageClass} onClick={removeImage}>
        <IoClose size={20} color="white" />
      </div>
      <StaticImage
        src={image}
        className="rounded-lg"
        alt="Product Image"
        width={85}
        height={85}
      />
    </div>
  );
};

export default SelectedImage;
