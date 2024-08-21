import { Dialog, DialogPanel, Tab, TabGroup, TabList } from "@tremor/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Flex, FlexBetween, HeaderOne, Paragraph } from "@/lib";
import { useAppSelector } from "@/hooks/store";
import { useUsersModal } from "@/context/useUsers";
import { IoClose } from "react-icons/io5";
import TestUsers from "../user/test/TestUsers";
import Users from "../user/Users";
import Container from "../user/Container";
import CreateUser from "../user/test/CreateUser";

const UsersModal = () => {
  const auth = useAppSelector((state) => state.auth);
  const { isOpen, onClose } = useUsersModal();
  const [tab, setTab] = useState("real");
  const [current, setCurrent] = useState<TestCurrentType>("main");

  const getCurrent = () => {
    switch (current) {
      case "main":
        return <Container exitCurrent={setCurrent} />;
      case "add-user":
        return <CreateUser exitCurrent={setCurrent} />;
      default:
        return <Container exitCurrent={setCurrent} />;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="z-[600]">
      <DialogPanel
        style={{
          background: "white",
          borderStyle: "none",
          borderWidth: 0,
          borderColor: "white",
        }}
        className="p-0 bg-white h-[500px]"
      >
        {getCurrent()}
      </DialogPanel>
    </Dialog>
  );
};

export default UsersModal;
