import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { ClassNavbar, NavIconClass, NavInfoClass } from "./class";
import Image from "next/image";
import { GizRowLogo } from "@/assets";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import NotIcon from "@/lib/components/NotIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { openCart } from "@/redux/cartSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  return (
    <div className={ClassNavbar}>
      <div className="-translate-y-[30px]">
        <Image src={GizRowLogo} width={150} height={150} alt="Logo" />
      </div>
      <div className={NavInfoClass}>
        <IoSearch className={NavIconClass} size={30} />
        <IoNotifications className={NavIconClass} size={30} />
        <FaUser className={NavIconClass} size={25} />
        <div
          onClick={() => dispatch(openCart())}
          className="flex relative cursor-pointer"
        >
          <NotIcon data={cart.length} />
          <MdShoppingCart className={NavIconClass} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
