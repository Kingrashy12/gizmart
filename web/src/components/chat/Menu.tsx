import React from "react";
import MenuIcon from "./messages/custom/MenuIcon";
import { useAppSelector } from "@/hooks/store";
import toast from "react-hot-toast";
import { IoInformationCircleOutline } from "react-icons/io5";

const Menu: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const chatState = useAppSelector((state) => state.chat);
  const selectedChat = chatState.selectedChat.user;
  const name = selectedChat.name;
  const truncatedName = name.length > 8 ? name.slice(0, 8) + "..." : name;

  function not_ava() {
    toast("This feature is not available yet. Please check back later!", {
      icon: <IoInformationCircleOutline color="blue" size={25} />,
    });
    closeMenu();
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-3 absolute top-10 right-3 bg-white z-[300] drop-shadow p-2 rounded-lg w-[200px]"
    >
      <MenuIcon type="search" onClick={not_ava} />
      <MenuIcon type="block" name={truncatedName} onClick={not_ava} />
      <MenuIcon type="report" onClick={not_ava} />
      <MenuIcon type="clear" onClick={not_ava} />
    </div>
  );
};

export default Menu;
