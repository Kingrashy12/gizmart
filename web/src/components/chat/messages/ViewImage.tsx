import Arrow from "@/components/indicator/Arrow";
import { Flex, StaticImage } from "@/lib";
import { Dialog } from "@tremor/react";
import React, { useState } from "react";

type ViewImageType = {
  images: any[];
  closeView: () => void;
  isOpen: boolean;
  currentImage: any;
  setCurrentImage: any;
};

const ViewImage = ({
  closeView,
  images,
  isOpen,
  currentImage,
  setCurrentImage,
}: ViewImageType) => {
  function viewNext(e: any) {
    e.stopPropagation();
    setCurrentImage((prevIndex: number) => {
      const currentIndex = images.indexOf(prevIndex);
      const nextIndex = (currentIndex + 1) % images.length;

      return images[nextIndex];
    });
  }
  const current = currentImage?.url === images[0]?.url;
  function viewPrev(e: any) {
    e.stopPropagation();
    setCurrentImage((prevIndex: number) => {
      const currentIndex = images.indexOf(prevIndex);
      const nextIndex = (currentIndex - 1) % images.length;
      if (currentIndex === 0) {
        return images[0];
      } else {
        return images[nextIndex];
      }
    });
  }
  return (
    <Dialog
      open={isOpen}
      onClose={closeView}
      onClick={closeView}
      className="max-[480px]:p-0"
    >
      <Flex className="items-center gap-4 justify-center max-[480px]:p-0">
        <Arrow
          onClick={viewPrev}
          type="fixed-scroll"
          position="left"
          size={50}
          disabled={current}
          className={`${
            images.length === 1 && "hidden"
          } max-[480px]:absolute max-[480px]:left-4`}
        />
        <StaticImage
          alt="Message"
          src={currentImage?.url}
          width={100}
          height={100}
          className="w-1/3 rounded-2xl max-[1024px]:w-1/2 max-[480px]:w-full max-[480px]:rounded-none"
          onClick={(e) => e.stopPropagation()}
        />
        <Arrow
          onClick={viewNext}
          type="fixed-scroll"
          position="right"
          size={50}
          className={`${
            images.length === 1 && "hidden"
          } max-[480px]:absolute max-[480px]:right-4`}
        />
      </Flex>
    </Dialog>
  );
};

export default ViewImage;
