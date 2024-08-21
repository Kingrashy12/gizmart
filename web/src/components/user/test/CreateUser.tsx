import React, { useState } from "react";
import { Flex, FlexBetween, HeaderOne, Paragraph } from "@/lib";
import { useAppSelector } from "@/hooks/store";
import { LuArrowLeft } from "react-icons/lu";
import AddUser from "./AddUser";

const CreateUser: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<TestCurrentType>>;
}> = ({ exitCurrent }) => {
  return (
    <Flex className="flex-col gap-3">
      <Flex className="p-3 text-black items-center border-b bg-white rounded-t-lg gap-3">
        <LuArrowLeft
          size={30}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
          onClick={() => exitCurrent("main")}
        />
        <HeaderOne fontPoppins className="font-semibold text-lg">
          Add User
        </HeaderOne>
      </Flex>
      <Flex className="flex-col gap-3 p-3 overflow-y-auto">
        <AddUser />
      </Flex>
    </Flex>
  );
};

export default CreateUser;
