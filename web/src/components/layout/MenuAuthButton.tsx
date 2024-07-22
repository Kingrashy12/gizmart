import { useMenuModal } from "@/context/useMenu";
import { Button } from "@tremor/react";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";

const MenuAuthButton = () => {
  const { onClose } = useMenuModal();
  return (
    <div className="flex items-center w-full justify-between">
      <Fade direction="up" cascade>
        <Link href="/account/sign-up">
          <Button
            onClick={onClose}
            variant="primary"
            className="bg-primaryColor outline-none w-28 border-none hover:opacity-75 hover:bg-primaryColor"
          >
            Sign Up
          </Button>
        </Link>
        <Link href="/account/login">
          <Button
            onClick={onClose}
            variant="secondary"
            className="border-primaryColor outline-none w-28 text-primaryColor hover:text-primaryColor"
          >
            Login
          </Button>
        </Link>
      </Fade>
    </div>
  );
};

export default MenuAuthButton;
