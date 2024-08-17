import React, { useEffect, useState } from "react";
// import { NavBarContainer } from "./class";
import Image from "next/image";
import { GizRowLogo } from "@/assets";
import Link from "next/link";
import { Icon } from "@tremor/react";
import { RiMenuLine, RiNotification4Line } from "@remixicon/react";
import { Divider, HeightDivider, NotIcon } from "@/lib";
import NavLinks from "./NavLinks";
import { NavBarContainer, NavHeader } from "./class";
import NavTab from "../tab/NavTab";
import { useMenuModal } from "@/context/useMenu";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
import { useCartModal } from "@/context/useCart";
import SearchInput from "../filter/Search";
import toast from "react-hot-toast";
import { useSearchModal } from "@/context/useSearch";
import { MdShoppingCart } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import io from "socket.io-client";
import { SOCKET_URL } from "@/constants";
import { useNotificationModal } from "@/context/useNotification";
import { updateNotification } from "@/redux/notificationSlice";

const Navbar = () => {
  const { onOpen } = useMenuModal();
  const { onOpen: openCart } = useCartModal();
  const path = useRouter();
  const [query, setQuery] = useState("");
  const cartState = useAppSelector((state) => state.cart);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  function Search(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function onKeySearch(event: React.KeyboardEvent<HTMLInputElement>) {
    const searchQuery = query
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/\--+/g, "-");
    if (event.key === "Enter") {
      // setQuery("");
      path.prefetch(`/search?query=${searchQuery}`);
      if (typeof window !== undefined) {
        window.location.href = `/search?query=${searchQuery}`;
      }
    }
  }

  const hideOnAuth =
    path.pathname === "/account/sign-up" || path.pathname === "/account/login";
  const { onOpen: openSearch } = useSearchModal();
  const { onOpen: openAlert } = useNotificationModal();
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleNotification = (unread: NotificationType[]) => {
    setNotifications(unread);
  };
  const handleNotifications = (notifications: NotificationType[]) => {
    dispatch(updateNotification(notifications));
  };

  useEffect(() => {
    if (!authState.userId) return;
    const socket = io(SOCKET_URL);
    socket.emit("get_notification", authState.userId);

    socket.on("unread_notifications", handleNotification);

    return () => {
      socket.off("unread_notifications", handleNotification);
    };
  }, [notifications]);

  useEffect(() => {
    if (!authState.userId) return;
    const socket = io(SOCKET_URL);
    socket.emit("fetch_notification", authState.userId);

    socket.on("notifications", handleNotifications);

    return () => {
      socket.off("notifications", handleNotifications);
    };
  }, [notifications]);

  return (
    <div
      className={`${NavBarContainer} ${
        hideOnAuth ? "hidden" : "flex"
      } drop-shadow`}
    >
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
        <SearchInput
          className="w-[50%] max-[700px]:hidden"
          placeholder="Search products"
          value={query}
          onChange={Search}
          onKeyUp={onKeySearch}
        />
        <div className="flex gap-6 items-center relative h-full">
          {authState.userLoaded ? null : (
            <NavTab
              url="/account/login"
              label="Login"
              className="max-[800px]:hidden text-sm hover:underline"
            />
          )}
          {!authState.userLoaded && (
            <HeightDivider className="max-[800px]:hidden" />
          )}
          <RiSearchLine
            className="text-black hidden max-[700px]:block"
            size={25}
            onClick={openSearch}
          />
          <div className="flex relative flex-col">
            <NotIcon
              data={cartState.quantity.length}
              className="text-[12px] top-0"
              style={{ top: "-6px", right: "-5px" }}
            />
            <MdShoppingCart
              onClick={openCart}
              size={26}
              className="text-black cursor-pointer hover:text-primaryColor"
            />
          </div>
          {authState.userLoaded ? (
            <div className="flex relative flex-col">
              <NotIcon
                data={notifications.length}
                className="text-[12px] top-0"
                style={{ top: "-6px", right: "-5px" }}
              />
              <RiNotification4Line
                size={25}
                onClick={openAlert}
                className="text-black cursor-pointer hover:text-primaryColor"
              />
            </div>
          ) : null}
        </div>
      </div>
      <Divider />
      <NavLinks />
    </div>
  );
};

export default Navbar;
