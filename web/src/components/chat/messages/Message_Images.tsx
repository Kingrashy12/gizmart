import { Flex, StaticImage } from "@/lib";
import React from "react";

type ImagesProps = {
  Message: MessageType;
  userId: string;
  viewImage: (index: number) => void;
};

const Message_Images = ({ Message, userId, viewImage }: ImagesProps) => {
  const { images } = Message;
  const imageCount = images.length;

  const justOne = imageCount === 1;
  const isTwo = imageCount === 2;
  const isThree = imageCount === 3;
  const isFour = imageCount === 4;
  return (
    <Flex
      className={`gap-1 ${isThree && "flex-wrap"} ${isFour && "flex-wrap"}`}
    >
      {images.map((image, index) => (
        <StaticImage
          src={image.url}
          alt="message"
          width={100}
          height={100}
          key={index}
          onClick={() => viewImage(index)}
          className={`cursor-pointer hover:opacity-70 ${
            justOne ? "rounded-xl w-[250px] h-[200px]" : ""
          } ${isTwo && "rounded-xl"} ${isThree && "rounded-xl"} ${
            isThree && index === 2
              ? "w-full"
              : isThree && index !== 2
              ? "w-[142px] max-[330px]:w-[138px] max-[320px]:w-[132.5px]"
              : ""
          } ${
            isFour &&
            "rounded-xl w-[142px] max-[330px]:w-[138px] max-[320px]:w-[132.5px]"
          }`}
        />
      ))}
    </Flex>
  );
};

export default Message_Images;
