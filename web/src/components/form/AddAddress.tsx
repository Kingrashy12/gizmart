import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Paragraph, Flex } from "@/lib";
import { LuArrowLeft } from "react-icons/lu";
import Input from "./Input";
import CustomButton from "../CustomButton";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { addAddress } from "@/redux/thunks/auth";

const AddAddress: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<SettingsCurrentType>>;
}> = ({ exitCurrent }) => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isLoading = user.addressStatus === "pending";

  const { onOpen, onClose, isOpen } = useBackgroundLoader();

  useEffect(() => {
    if (isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading]);

  const [form, setForm] = useState({
    userId: user.userId,
    state: "",
    city: "",
    address: "",
    current: false,
  });

  function handleForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    if (user.address.length < 1) {
      setForm({ ...form, current: true });
    }
  }, []);

  const disablebtn = !form.address || !form.state || !form.city;

  function add() {
    dispatch(addAddress(form));
  }

  return (
    <Flex
      className={`flex-col gap-3 text-black ${isOpen && "cursor-not-allowed"}`}
    >
      <Flex className="gap-3 p-3 items-center rounded-t-lg bg-white border-b">
        <LuArrowLeft
          size={30}
          onClick={() => exitCurrent("address")}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <Paragraph fontPoppins className="text-lg font-semibold">
          Add address
        </Paragraph>
      </Flex>
      <Flex className="flex-col gap-3 p-3">
        <Input
          label="State"
          placeholder="Enter your state"
          value={form.state}
          onChange={handleForm}
          name="state"
        />
        <Input
          label="City"
          placeholder="Enter your city"
          value={form.city}
          onChange={handleForm}
          name="city"
        />
        <Input
          label="Address"
          placeholder="Enter your house address"
          value={form.address}
          onChange={handleForm}
          name="address"
        />

        <CustomButton
          variant="primary"
          disabled={disablebtn || isLoading}
          onClick={add}
        >
          Add
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default AddAddress;
