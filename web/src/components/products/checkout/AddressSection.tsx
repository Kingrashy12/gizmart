import { IconWrap } from "@/components";
import { useAppSelector } from "@/hooks/store";
import { Flex, Paragraph } from "@/lib";
import React, { useState } from "react";
import { BsFillHouseExclamationFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const AddressSection: React.FC<{
  setDeliveryAddress: React.Dispatch<
    React.SetStateAction<AddressType | undefined>
  >;
}> = ({ setDeliveryAddress }) => {
  const [selected, setSelected] = useState<AddressType>();
  const [openSelect, setOpenSelect] = useState(false);
  const address = useAppSelector((state) => state.auth.address);
  const no_address = address.length < 1;

  function selectAddress(ad: AddressType) {
    setSelected(ad);
    setDeliveryAddress(ad);
    setOpenSelect(false);
  }

  return (
    <Flex className="flex-col p-3 drop-shadow">
      <Flex
        className={`p-2 gap-2 items-center bg-white cursor-pointer ${
          openSelect ? "rounded-t-lg border-b-2" : "rounded-lg"
        }`}
        onClick={() => setOpenSelect(!openSelect)}
      >
        <IconWrap
          Icon={openSelect ? MdKeyboardArrowDown : MdKeyboardArrowRight}
          size={23}
          useCustom
        />
        <Paragraph fontPoppins className="font-medium text-sm">
          {selected ? selected?.address : "Select delivery address"}
        </Paragraph>
      </Flex>
      {openSelect && (
        <Flex className="flex-col gap-2 rounded-b-lg bg-softGray drop-shadow">
          {no_address ? (
            <Flex className="flex-col gap-3 items-center justify-center overflow-y-auto">
              <BsFillHouseExclamationFill
                size={50}
                className="text-neutral-500"
              />
              <Paragraph fontPoppins className="text-neutral-500 font-medium">
                You&apos;re yet to add your delivery address
              </Paragraph>
            </Flex>
          ) : (
            address.map((ad) => (
              <Flex
                key={ad.id}
                onClick={() => selectAddress(ad)}
                className="items-center p-3 border-b cursor-pointer"
              >
                <Paragraph fontJakarta className="text-sm font-medium">
                  {ad.address}
                </Paragraph>
              </Flex>
            ))
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default AddressSection;
