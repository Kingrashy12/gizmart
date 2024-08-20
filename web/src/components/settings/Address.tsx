import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Paragraph, Flex, FlexBetween } from "@/lib";
import { LuArrowLeft } from "react-icons/lu";
import { BsFillHouseExclamationFill } from "react-icons/bs";
import CustomButton from "../CustomButton";
import { MdAddLocationAlt, MdEditLocationAlt } from "react-icons/md";
import { RiDeleteBin2Line } from "@remixicon/react";
import CustomIcon from "../icons/CustomIcon";

const Address: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<SettingsCurrentType>>;
}> = ({ exitCurrent }) => {
  const user = useAppSelector((state) => state.auth);
  const no_address = user.address.length < 1;
  return (
    <Flex className="flex-col gap-3 text-black">
      <FlexBetween className="p-3 rounded-t-lg bg-white border-b">
        <Flex className="gap-3 items-center">
          <LuArrowLeft
            size={30}
            onClick={() => exitCurrent("")}
            className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
          />
          <Paragraph fontPoppins className="text-lg font-semibold">
            Manage address
          </Paragraph>
        </Flex>
        <CustomIcon
          hasTitle
          title="Add new address"
          iconSize="lg"
          icon={MdAddLocationAlt}
          iconClass="text-black z-[50] relative"
          useCustom
          customIconSize={24}
          titleWidth="150px"
          titleClass="-bottom-11"
          onClick={() => exitCurrent("add-address")}
        />
      </FlexBetween>
      <Flex className="flex-col gap-3 p-3">
        {no_address ? (
          <Flex className="flex-col gap-3 items-center justify-center overflow-y-auto">
            <BsFillHouseExclamationFill
              size={50}
              className="text-neutral-500"
            />
            <Paragraph fontPoppins className="text-neutral-500 font-medium">
              You&apos;re yet to add your address
            </Paragraph>
            <CustomButton
              onClick={() => exitCurrent("add-address")}
              variant="primary"
            >
              Add address
            </CustomButton>
          </Flex>
        ) : (
          user.address.map((address) => (
            <FlexBetween key={address.id} className="items-center">
              <Paragraph fontJakarta className="text-sm font-medium">
                {address.address}
              </Paragraph>

              <div className="items-center gap-5 flex">
                <MdEditLocationAlt
                  size={30}
                  className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
                />
                <RiDeleteBin2Line
                  size={30}
                  className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
                />
              </div>
            </FlexBetween>
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default Address;
