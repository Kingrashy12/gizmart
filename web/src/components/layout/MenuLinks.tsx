import React from "react";
import MenuTab from "../tab/MenuTab";
import {
  RiApps2AddLine,
  RiCoupon3Fill,
  RiLogoutCircleRLine,
  RiMegaphoneLine,
  RiMessage3Line,
  RiReceiptFill,
  RiSettingsLine,
  RiShoppingBag4Fill,
  RiStarLine,
} from "@remixicon/react";
import { useRouter } from "next/router";
import { useMenuModal } from "@/context/useMenu";
import { useSettingsModal } from "@/context/useSettings";
import { logUserout } from "@/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useSellProductModal } from "@/context/useSell";
import { GoChecklist } from "react-icons/go";
import { MdBookmark } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { useUsersModal } from "@/context/useUsers";

const MenuLinks = () => {
  const path = useRouter();
  const { onClose } = useMenuModal();
  const { onOpen } = useSettingsModal();
  const { onOpen: openUsersPanel } = useUsersModal();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen: openSell } = useSellProductModal();
  const authState = useAppSelector((state) => state.auth);

  function openSetting() {
    onClose();
    onOpen();
  }
  function opensell() {
    onClose();
    openSell();
  }
  function openUsers() {
    onClose();
    openUsersPanel();
  }
  return (
    <div className="flex flex-col w-full relative gap-6 h-full">
      {/* <MenuTab
        url="/dashboard"
        label="Dashboard"
        islink
        isactive={path.pathname === "/dashboard"}
        icon={RiStore3Line}
        onClick={onClose}
        className={authState.isSeller ? "flex" : "hidden"}
      /> */}
      <MenuTab
        label="Sell products"
        isactive={isOpen}
        icon={RiApps2AddLine}
        onClick={opensell}
        className={authState.isSeller ? "flex" : "hidden"}
      />
      <MenuTab
        url="/marchants/order-management"
        label="Order Management"
        islink
        onClick={onClose}
        isactive={path.pathname === "/order-management"}
        icon={GoChecklist}
        className={authState.isSeller ? "flex" : "hidden"}
      />
      <MenuTab
        url="/products"
        label="Products"
        islink
        onClick={onClose}
        isactive={path.pathname === "/products"}
        icon={RiShoppingBag4Fill}
        className={authState.isSeller ? "flex" : "hidden"}
      />
      <MenuTab
        url="/orders"
        label="Orders"
        islink
        onClick={onClose}
        isactive={path.pathname === "/orders"}
        icon={RiReceiptFill}
      />
      <MenuTab
        url="/messages"
        label="Messages"
        islink
        onClick={onClose}
        isactive={path.pathname === "/message"}
        icon={RiMessage3Line}
        hasNot
        notValue={0}
      />
      <MenuTab
        label="Users"
        className={authState.isAdmin ? "flex" : "hidden"}
        onClick={openUsers}
        icon={FaUsersGear}
      />
      <MenuTab
        url="/saved"
        label="Saved product"
        islink
        onClick={onClose}
        isactive={path.pathname === "/saved"}
        icon={MdBookmark}
      />
      <MenuTab onClick={openSetting} label="Settings" icon={RiSettingsLine} />
      <MenuTab
        url="/campaign"
        label="Campaign"
        islink
        onClick={onClose}
        isactive={path.pathname === "/campaign"}
        icon={RiMegaphoneLine}
      />
      <MenuTab
        url="/voucher"
        label="Vouchers"
        islink
        onClick={onClose}
        isactive={path.pathname === "/voucher"}
        icon={RiCoupon3Fill}
      />

      <MenuTab
        onClick={() => dispatch(logUserout())}
        label="Sign out"
        icon={RiLogoutCircleRLine}
      />
    </div>
  );
};

export default MenuLinks;
