import { Flex, FlexBetween, Paragraph } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { NumberInput, Textarea, TextInput } from "@tremor/react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import SelectedImage from "./SelectedImage";
import { FaPlus } from "react-icons/fa";
import { SellProps } from "./CollectionSection";
import { RiPriceTag2Fill } from "@remixicon/react";

const Desc_Section = ({
  form,
  setForm,
  isCreating,
  isDeliveryFree,
}: SellProps) => {
  const [images, setImages] = useState<any[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreating) {
      setImages([]);
    }
  }, [isCreating]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file && file[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setImages((prevImage: any) => [...prevImage, newImage]);
        setForm({ ...form, images: [...form.images, newImage] });
      };
      reader.readAsDataURL(file[0]);
    }
  }

  function removeImage(index: number) {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setForm({ ...form, images: updatedImages });
  }
  return (
    <Flex
      className={`${poppinsFont.className} flex-col gap-4 text-black font-medium text-sm`}
    >
      <FlexBetween className="gap-3">
        <Flex className="flex-col gap-2">
          <Paragraph>Name</Paragraph>
          <TextInput
            className="p-[2px]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product name"
            type="text"
          />
        </Flex>
        <Flex
          className={`${isDeliveryFree ? "hidden" : "flex"} flex-col gap-2`}
        >
          <Paragraph>Delivery fee</Paragraph>
          <NumberInput
            className="p-[2px]"
            value={form.delivery_fee}
            onChange={(e) => setForm({ ...form, delivery_fee: e.target.value })}
            placeholder="Delivery fee"
            enableStepper={false}
            icon={RiPriceTag2Fill}
          />
        </Flex>
      </FlexBetween>
      <Flex className="flex-col gap-2">
        <Paragraph>Description</Paragraph>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />
      </Flex>
      <div className="flex gap-4 flex-wrap">
        {images.length >= 1 ? (
          images.map((image: any, index: any) => (
            <SelectedImage
              key={index}
              image={image}
              index={index}
              removeImage={() => removeImage(index)}
            />
          ))
        ) : (
          <div
            className="flex flex-col w-[150px] cursor-pointer items-center justify-center border-dashed border-[3px] rounded-lg p-3 gap-3"
            onClick={() => imgRef?.current?.click()}
          >
            <IoIosCloudUpload size={25} className="text-green-500" />
            <Paragraph className="text-center text-xs">
              Upload products image
            </Paragraph>
          </div>
        )}
        {images.length >= 1 && (
          <div
            className="flex flex-col w-[150px] cursor-pointer items-center justify-center border-dashed border-[3px] rounded-lg p-3 gap-3"
            onClick={() => imgRef?.current?.click()}
          >
            <FaPlus size={25} className="text-neutral-300" />
            <Paragraph className="text-center text-xs">
              Add more image
            </Paragraph>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={imgRef}
        hidden
        onChange={handleImageUpload}
        accept="image/png, image/jpeg"
      />
    </Flex>
  );
};

export default Desc_Section;
