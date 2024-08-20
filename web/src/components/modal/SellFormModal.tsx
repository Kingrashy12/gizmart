import { Dialog, DialogPanel } from "@tremor/react";
import { useRouter } from "next/router";
import React from "react";
import { Flex, Paragraph } from "@/lib";
import { useAppSelector } from "@/hooks/store";
import AccountValidator from "../user/AccountValidator";
import Icon from "../icons/Icon";
import { VscSignIn } from "react-icons/vsc";
import Link from "next/link";
import CustomButton from "../CustomButton";

const SellFormModal = () => {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  return (
    <Dialog open onClose={() => router.back()} className="z-[600]">
      <DialogPanel>
        {auth.userLoaded ? (
          <AccountValidator />
        ) : (
          <Flex className="flex-col gap-5 items-center justify-center">
            <Icon Icon={VscSignIn} size={60} color="black" />
            <Paragraph fontPoppins className="font-medium text-base">
              You&apos;re not authorized to carry on this action
            </Paragraph>
            <Link href="/account/login">
              <CustomButton variant="primary" icon={VscSignIn}>
                Login to procced
              </CustomButton>
            </Link>
          </Flex>
        )}
      </DialogPanel>
    </Dialog>
  );
};

export default SellFormModal;
