import React from "react";
import MenuTab from "../tab/MenuTab";
import {
  RiCoupon3Fill,
  RiMegaphoneLine,
  RiMessage3Line,
  RiPieChartFill,
  RiSettingsLine,
  RiShoppingBag4Fill,
  RiShoppingCartFill,
  RiStarLine,
} from "@remixicon/react";
import { useRouter } from "next/router";
import { Fade } from "react-awesome-reveal";

const MenuLinks = () => {
  const path = useRouter();
  return (
    <div className="flex flex-col w-full relative gap-6 h-full">
      <Fade direction="left" cascade>
        <MenuTab
          url="/dashboard"
          label="Dashboard"
          islink
          isactive={path.pathname === "/dashboard"}
          icon={RiPieChartFill}
        />
        <MenuTab
          url="/products"
          label="Products"
          islink
          isactive={path.pathname === "/products"}
          icon={RiShoppingBag4Fill}
        />
        <MenuTab
          url="/orders"
          label="Orders"
          islink
          isactive={path.pathname === "/orders"}
          icon={RiShoppingCartFill}
        />
        <MenuTab
          url="/message"
          label="Message"
          islink
          isactive={path.pathname === "/message"}
          icon={RiMessage3Line}
        />
        <MenuTab
          url="/favourite"
          label="Favourite"
          islink
          isactive={path.pathname === "/favourite"}
          icon={RiStarLine}
        />
        <MenuTab
          // url="/settings"
          label="Settings"
          // isactive={path.pathname === "/settings"}
          icon={RiSettingsLine}
        />
        <MenuTab
          url="/campaign"
          label="Campaign"
          islink
          isactive={path.pathname === "/campaign"}
          icon={RiMegaphoneLine}
        />
        <MenuTab
          url="/voucher"
          label="Vouchers"
          islink
          isactive={path.pathname === "/voucher"}
          icon={RiCoupon3Fill}
        />
      </Fade>
    </div>
  );
};

export default MenuLinks;
