import CustomButton from "@/components/CustomButton";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, HeaderOne, Paragraph, StaticImage } from "@/lib";
import { demoLogin } from "@/redux/thunks/auth";
import React, { useEffect } from "react";

interface ConfirmProps {
  user: UserType;
  closeConfirm: () => void;
}

const ConfirmLogin = ({ user, closeConfirm }: ConfirmProps) => {
  const dispatch = useAppDispatch();
  const { onClose, onOpen } = useBackgroundLoader();
  const isLoading = useAppSelector(
    (state) => state.auth.loginStatus === "pending"
  );

  useEffect(() => {
    if (isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading]);

  function confirm() {
    dispatch(demoLogin(user.email));
    setTimeout(() => {
      closeConfirm();
    }, 2000);
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed w-full inset-0 h-full flex items-center justify-center bg-[rgb(0,0,0,.5)] z-[700]"
    >
      <Flex className="bg-white rounded-lg flex-col gap-3 drop-shadow w-[400px] h-auto">
        <HeaderOne fontPoppins className="font-semibold text-lg border-b p-3">
          Confirm login
        </HeaderOne>
        <Flex className="flex-col gap-3 p-3 items-center justify-center h-full">
          <StaticImage
            src={user.profile.url}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full border-[4]"
          />
          <Paragraph fontPoppins className="font-semibold text-base">
            {user.name}
          </Paragraph>
          <Flex className="items-center justify-between gap-3">
            <CustomButton
              variant="primary"
              className="hover:opacity-75 w-1/3"
              disabled={isLoading}
              isloading={isLoading}
              onClick={confirm}
            >
              Confirm
            </CustomButton>
            <CustomButton
              variant="pending"
              className="hover:opacity-75 w-1/3"
              onClick={closeConfirm}
              disabled={isLoading}
            >
              Change user
            </CustomButton>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default ConfirmLogin;
