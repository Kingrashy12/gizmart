import { useAppSelector } from "@/hooks/store";
import { Flex, FlexBetween, HeaderOne } from "@/lib";
import React from "react";
import { IoClose } from "react-icons/io5";
import DemoAccountCard from "../user/test/DemoAccountCard";

import { useDemoUsers } from "@/context/useDemo";
import { Dialog, DialogPanel } from "@tremor/react";

const DemoLogin = () => {
  const userState = useAppSelector((state) => state.user);
  const demoAccounts = userState.demo_accounts;
  const { onClose, isOpen } = useDemoUsers();

  return (
    <Dialog open={isOpen} onClose={onClose} className="z-[500]">
      <DialogPanel className="p-0">
        <Flex className="flex-col w-[500px] max-[550px]:w-[90%] bg-white rounded-lg drop-shadow">
          <FlexBetween className="border-b items-center p-3 rounded-t-lg">
            <HeaderOne fontPoppins className="font-semibold text-lg">
              Choose an account
            </HeaderOne>
            <IoClose
              size={30}
              onClick={onClose}
              className="p-1 bg-black rounded-full hover:opacity-75 cursor-pointer text-white"
            />
          </FlexBetween>
          <Flex className="p-3 flex-col gap-3 rounded-b-lg">
            {demoAccounts?.map((user, index) => (
              <DemoAccountCard key={index} user={user} />
            ))}
          </Flex>
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default DemoLogin;
