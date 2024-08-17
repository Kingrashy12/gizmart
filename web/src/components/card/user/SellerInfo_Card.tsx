import React, { useCallback, useEffect } from "react";
import Wrapper from "../Wrapper";
import {
  Divider,
  Flex,
  FlexBetween,
  HeightDivider,
  Paragraph,
  StaticImage,
} from "@/lib";
import { MdCalendarMonth, MdVerified } from "react-icons/md";
import CustomIcon from "@/components/icons/CustomIcon";
import { formatTime } from "@/utils";
import Details_ from "./Details_";
import CustomButton from "@/components/CustomButton";
import { IoChatboxEllipses } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { create_Chat } from "@/redux/thunks/chats";
import { clear_Create_Status } from "@/redux/chatSlice";

interface SellerCard {
  user: Seller_Type;
}
const SellerInfo_Card = ({ user }: SellerCard) => {
  const User = useAppSelector((state) => state.auth);
  const chatState = useAppSelector((state) => state.chat);
  const is_creating = chatState.createStatus === "pending";
  const isStillFetching = chatState.fetchStatus === "pending";
  const chats = chatState.chats;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const senderId = User.userId;
  const receiverId = user._id;

  function chatUser() {
    if (User.userLoaded) {
      const existingChat = chats.find((chat) =>
        chat.members.includes(user._id)
      );
      if (existingChat) {
        router.push("/messages");
      } else {
        dispatch(create_Chat({ senderId, receiverId }));
        router.push("/messages");
      }
    } else {
      toast(`Please login to chat with ${user.name}`);
    }
  }

  return (
    <Wrapper>
      <FlexBetween className="w-full gap-7 max-[480px]:gap-5 max-[480px]:flex-col">
        <div className="flex-col flex gap-3 p-3 border rounded-xl w-auto justify-center items-center">
          <StaticImage
            src={user.profile.url}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full justify-center items-center flex"
          />
          <FlexBetween className="gap-4">
            <Flex className="items-center gap-1">
              <Paragraph fontPoppins className="font-semibold">
                {user.name}
              </Paragraph>
              <CustomIcon
                icon={MdVerified}
                title="Verified Seller"
                iconSize="md"
                iconClass="text-primaryColor"
                hasTitle
                titleClass="top-9 w-[100px]"
                className={user.isVerified ? "-translate-x-2" : "hidden"}
              />
            </Flex>
            {User?.userId === user._id ? null : (
              <CustomButton
                onClick={chatUser}
                icon={IoChatboxEllipses}
                variant="primary"
                disabled={is_creating || isStillFetching}
                isloading={is_creating}
              >
                Chat
              </CustomButton>
            )}
          </FlexBetween>
          <Flex className="items-center gap-1 text-blak">
            <MdCalendarMonth size={19} className="" />
            <Paragraph fontRoboto className="font-medium text-xs">
              Joined: {formatTime(user.createdAt)}
            </Paragraph>
          </Flex>
        </div>
        {/* <HeightDivider className="max-[480px]:hidden h-auto" />
        <Divider className="max-[480px]:flex hidden" />
        <Details_ /> */}
      </FlexBetween>
    </Wrapper>
  );
};

export default SellerInfo_Card;
