import { Dialog, DialogPanel, Tab, TabGroup, TabList } from "@tremor/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Flex, FlexBetween, HeaderOne, Paragraph } from "@/lib";
import { useAppSelector } from "@/hooks/store";
import { useUsersModal } from "@/context/useUsers";
import { IoClose } from "react-icons/io5";
import TestUsers from "../user/test/TestUsers";
import Users from "../user/Users";

const Container: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<TestCurrentType>>;
}> = ({ exitCurrent }) => {
  const auth = useAppSelector((state) => state.auth);
  const { isOpen, onClose } = useUsersModal();
  const [tab, setTab] = useState("real");

  return (
    <Flex className="flex-col gap-3">
      <FlexBetween className="p-3 text-black items-center border-b bg-white rounded-t-lg">
        <HeaderOne fontPoppins className="font-semibold text-lg">
          Users
        </HeaderOne>
        <IoClose
          size={30}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
          onClick={onClose}
        />
      </FlexBetween>
      <Flex className="p-3 border-b">
        <TabGroup>
          <TabList
            variant="solid"
            color="yellow"
            style={{ background: "rgb(229,229,229)" }}
            className="w-full"
          >
            <Tab
              onClick={() => setTab("live")}
              style={{
                background: tab === "live" ? "white" : "",
                borderStyle: "none",
              }}
              className="w-full font-semibold items-center justify-center"
              value="real"
            >
              Live
            </Tab>
            <Tab
              onClick={() => setTab("test")}
              style={{
                background: tab === "test" ? "white" : "",
                borderStyle: "none",
              }}
              value="test"
              className="w-full font-semibold items-center justify-center"
            >
              Test
            </Tab>
          </TabList>
        </TabGroup>
      </Flex>
      <Flex className="flex-col">
        {tab === "live" ? <Users /> : <TestUsers exitCurrent={exitCurrent} />}
      </Flex>
    </Flex>
  );
};

export default Container;
