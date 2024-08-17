import CustomButton from "@/components/CustomButton";
import { Flex, FlexBetween, HeaderOne, Paragraph, StaticImage } from "@/lib";
import { Dialog, DialogPanel } from "@tremor/react";
import React from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

type SelectedImageType = {
  isOpen: boolean;
  closeSelection: () => void;
  handleImage: () => void;
  images: any[];
  removeImage: (index: number) => void;
  onApply: () => void;
};

const SelectedImages = ({
  isOpen,
  closeSelection,
  images,
  handleImage,
  removeImage,
  onApply,
}: SelectedImageType) => {
  return (
    <Dialog open={isOpen} onClose={closeSelection}>
      <DialogPanel className="flex flex-col gap-3 p-0">
        <FlexBetween className="border-b text-black p-3">
          <HeaderOne fontPoppins className="font-medium text-lg">
            Add image
          </HeaderOne>
          <IoClose
            onClick={closeSelection}
            size={30}
            className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
          />
        </FlexBetween>
        <Flex
          className={`p-3 gap-3 flex-wrap ${
            images.length < 1 && "justify-center items-center"
          }`}
        >
          {images.length >= 1 ? (
            images.map((image: any, index) => {
              return (
                <>
                  <div className="flex-col relative" key={index}>
                    <div
                      onClick={() => removeImage(index)}
                      className="flex cursor-pointer hover:opacity-70 items-center justify-center absolute bg-black p-1 rounded-tr-lg right-0 rounded-bl-lg"
                    >
                      <IoClose size={20} color="white" />
                    </div>
                    <StaticImage
                      width={100}
                      height={100}
                      src={image}
                      className="w-[100px]"
                      alt="Selected"
                    />
                  </div>
                </>
              );
            })
          ) : (
            <div
              onClick={handleImage}
              className="flex gap-2 cursor-pointer text-black border-neutral-400 h-[90px] w-auto flex-col items-center justify-center p-2 rounded-lg border-dashed border-2"
            >
              <IoIosCloudUpload
                className="text-green-500 p-1 rounded-full bg-green-200"
                size={25}
              />
              <Paragraph
                fontPoppins
                className="text-neutral-400 text-[10px] font-medium"
              >
                PNG,SVG,JPEG
              </Paragraph>
            </div>
          )}
          {images.length >= 1 && (
            <div
              onClick={handleImage}
              className="flex cursor-pointer text-black border-neutral-500 h-[90px] w-[90px] flex-col items-center justify-center p-2 rounded-lg border-dashed border-2"
            >
              <IoAdd size={25} />
            </div>
          )}
        </Flex>
        <Flex className="p-3">
          <CustomButton
            variant="primary"
            onClick={onApply}
            className={images.length < 1 ? "hidden" : "w-full"}
          >
            Apply
          </CustomButton>
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default SelectedImages;
