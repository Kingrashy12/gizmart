import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageProps {
  src: StaticImageData | string;
  className?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  alt: string | any;
  onClick?: (e?: any) => void;
}

const StaticImage = ({
  src,
  className,
  width,
  height,
  alt,
  onClick,
}: ImageProps) => {
  return (
    <Image
      onClick={onClick}
      src={src}
      className={className}
      width={width}
      height={height}
      alt={alt}
      priority
    />
  );
};

export default StaticImage;
