import { Divider, Flex, Paragraph } from "@/lib";
import React, { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import PasswordInput from "../form/PasswordInput";
import CustomButton from "../CustomButton";
import toast from "react-hot-toast";
import { update_password } from "@/helper/patch.action";
import { useAppSelector } from "@/hooks/store";

interface PasswordTypes {
  exitChange: React.Dispatch<React.SetStateAction<SettingsCurrentType>>;
}

const Password: React.FC<PasswordTypes> = ({ exitChange }) => {
  const [isupdating, setIsUpdating] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);
  const [form, setForm] = useState({
    userId,
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const notMatched =
    form.confirmNewPassword && form.confirmNewPassword !== form.newPassword;
  const ismatched =
    form.confirmNewPassword && form.confirmNewPassword === form.newPassword;

  async function update() {
    if (ismatched && form.password) {
      setIsUpdating(true);
      try {
        const res = await update_password(form);
        toast.success(res?.message);
      } catch (error: any) {
        toast.error(error.response?.data);
      } finally {
        setIsUpdating(false);
      }
    }
  }

  return (
    <Flex className="flex-col gap-3 text-black">
      <Flex className="gap-3 p-3 items-center rounded-t-lg bg-white border-b">
        <LuArrowLeft
          size={30}
          onClick={() => exitChange("")}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <Paragraph fontPoppins className="text-lg font-semibold">
          Change Password
        </Paragraph>
      </Flex>
      <Flex className="flex-col gap-3 p-3">
        <PasswordInput
          label="Current password"
          value={form.password}
          onChange={handleFormChange}
          placeholder="Enter current password"
          name="password"
        />
        <Divider className="mt-1" />
        <PasswordInput
          label="New password"
          value={form.newPassword}
          onChange={handleFormChange}
          placeholder="Enter new password"
          name="newPassword"
        />
        <PasswordInput
          label="Confirm new password"
          value={form.confirmNewPassword}
          onChange={handleFormChange}
          placeholder="Confirm your new password"
          name="confirmNewPassword"
          error={notMatched}
          errMessage="Password does not match"
        />
        <Divider className="mt-1" />
        <CustomButton
          disabled={
            !form.password || !form.newPassword || !ismatched || isupdating
          }
          variant="primary"
          isloading={isupdating}
          onClick={update}
        >
          Update
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default Password;
