import { GizRowLogo } from "@/assets";
import { useMenuModal } from "@/context/useMenu";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import Image from "next/image";
import React from "react";
import { modalclasses } from "./class";
import { Divider } from "@/lib";
import MenuAuthButton from "../layout/MenuAuthButton";
import MenuLinks from "../layout/MenuLinks";
import { useAppSelector } from "@/hooks/store";
import toast from "react-hot-toast";

const Menu = () => {
  const { isOpen, onClose } = useMenuModal();
  const auth = useAppSelector((state) => state.auth);
  function testW() {
    // const width = global?.window.innerWidth;
    // toast.success(`device width:${width}`);
  }
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="z-[300]" static>
        <DialogPanel
          style={{ borderRadius: 0 }}
          className={modalclasses.menudialog}
        >
          <div className="flex flex-col w-full gap-5 relative h-auto">
            <Image
              onClick={testW}
              src={GizRowLogo}
              width={180}
              height={50}
              alt="Logo"
            />
            <Divider />
            {auth.userLoaded ? <MenuLinks /> : <MenuAuthButton />}
            {/* <MenuLinks /> */}
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default Menu;
