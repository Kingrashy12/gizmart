import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Paragraph, Flex } from "@/lib";
import React, { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import Input from "../form/Input";
import { MdOutlineAlternateEmail } from "react-icons/md";
import CustomButton from "../CustomButton";
import { updateEmail } from "@/redux/thunks/auth";

const Email: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<SettingsCurrentType>>;
}> = ({ exitCurrent }) => {
  const user = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const is_updating = authState.mailUpdateStatus === "pending";

  function update() {
    dispatch(updateEmail({ userId: user.userId, email }));
  }

  return (
    <Flex className="flex-col gap-3 text-black">
      <Flex className="gap-3 p-3 items-center rounded-t-lg bg-white border-b">
        <LuArrowLeft
          size={30}
          onClick={() => exitCurrent("")}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <Paragraph fontPoppins className="text-lg font-semibold">
          Change email
        </Paragraph>
      </Flex>
      <Flex className="flex-col gap-3 p-3">
        <Input
          label="Email"
          name="email"
          icon={MdOutlineAlternateEmail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <CustomButton
          variant="primary"
          onClick={update}
          isloading={is_updating}
          disabled={is_updating || email === user.email}
        >
          Update
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default Email;
