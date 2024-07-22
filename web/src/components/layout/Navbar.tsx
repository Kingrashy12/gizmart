import React from "react";
// import { NavBarContainer } from "./class";
import Image from "next/image";
import { GizRowLogo } from "@/assets";
import Link from "next/link";
import { Icon, TextInput } from "@tremor/react";
import {
  RiMenuLine,
  RiSearchLine,
  RiShoppingBag2Fill,
  RiShoppingBasketFill,
  RiShoppingCartFill,
  RiShoppingCartLine,
} from "@remixicon/react";
import { Divider, HeightDivider, NotIcon } from "@/lib";
import NavLinks from "./NavLinks";
import { NavBarContainer, NavHeader } from "./class";
import NavTab from "../tab/NavTab";
import { useMenuModal } from "@/context/useMenu";
import { useRouter } from "next/router";
import { useCartModal } from "@/context/useCart";

const Navbar = () => {
  const { onOpen } = useMenuModal();
  const { onOpen: openCart } = useCartModal();
  const path = useRouter();
  const hideOnAuth =
    path.pathname === "/account/sign-up" || path.pathname === "/account/login";
  return (
    <div className={`${NavBarContainer} ${hideOnAuth ? "hidden" : "flex"}`}>
      <div className={NavHeader}>
        <div className="flex items-center gap-3">
          <Icon
            icon={RiMenuLine}
            size="md"
            onClick={onOpen}
            className="text-black cursor-pointer"
          />
          <Link href="/">
            <Image
              src={GizRowLogo}
              className="max-[700px]:w-[120px]"
              alt="Logo"
              width={150}
              height={50}
            />
          </Link>
        </div>
        <TextInput
          icon={RiSearchLine}
          placeholder="Search products..."
          className="w-[50%] max-[700px]:hidden"
        />
        <div className="flex gap-3 items-center relative h-full">
          <NavTab
            url="/account/login"
            label="Login"
            className="max-[800px]:hidden text-sm hover:underline"
          />
          <HeightDivider className="max-[800px]:hidden" />
          <Icon
            icon={RiSearchLine}
            className="text-black hidden max-[700px]:block"
            size="lg"
          />
          <div className="flex relative flex-col">
            <NotIcon data={15} className="text-[12px]" />
            <Icon
              icon={RiShoppingCartFill}
              onClick={openCart}
              size="lg"
              className="text-black cursor-pointer hover:text-primaryColor"
            />
          </div>
        </div>
      </div>
      <Divider />
      <NavLinks />
    </div>
  );
};

export default Navbar;
