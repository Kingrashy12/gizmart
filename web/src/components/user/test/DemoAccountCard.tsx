import { Flex } from "@/lib";
import React, { useState } from "react";
import { StaticImage, Paragraph } from "@/lib";
import CustomIcon from "@/components/icons/CustomIcon";
import { TbAwardFilled } from "react-icons/tb";
import ConfirmLogin from "./ConfirmLogin";

const DemoAccountCard: React.FC<{ user: UserType }> = ({ user }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <Flex
      className="gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-neutral-100"
      onClick={() => setOpenConfirm(true)}
    >
      <StaticImage
        alt="User"
        src={user.profile?.url}
        width={50}
        height={50}
        className="rounded-full"
      />
      <Paragraph fontPoppins className="font-medium">
        {user.name}
      </Paragraph>
      <CustomIcon
        useCustom
        customIconSize={25}
        icon={TbAwardFilled}
        title="Seller account"
        iconSize="md"
        hasTitle
        titleWidth="120px"
        titleClass="-bottom-12"
        className={`${user.isSeller ? "flex z-20" : "hidden"}`}
        iconClass="text-primaryColor"
      />
      {openConfirm ? (
        <ConfirmLogin user={user} closeConfirm={() => setOpenConfirm(false)} />
      ) : null}
    </Flex>
  );
};

export default DemoAccountCard;
