import CustomButton from "@/components/CustomButton";
import UserForm from "@/components/form/UserForm";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, Paragraph, StaticImage } from "@/lib";
import { addDemoUser } from "@/redux/thunks/user";
import { Switch } from "@tremor/react";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera, FaRegUserCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

const AddUser = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const userState = useAppSelector((state) => state.user);
  const isLoading = userState.addStatus === "pending";
  const { onClose, onOpen } = useBackgroundLoader();

  useEffect(() => {
    if (isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading]);

  const [form, setForm] = useState({
    userId: userId,
    name: "",
    email: "",
    number: "",
    profile: "",
    isSeller: false,
  });

  const dispatch = useAppDispatch();

  const imgRef = useRef<HTMLInputElement>(null);

  function handleForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file && file[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result as string;
        setForm({ ...form, profile: newImage });
      };
      reader.readAsDataURL(file[0]);
    }
  }

  function add() {
    dispatch(addDemoUser(form));
    setTimeout(() => {
      setForm({
        ...form,
        name: "",
        email: "",
        number: "",
        isSeller: false,
        profile: "",
      });
    }, 3000);
  }

  return (
    <Flex className="flex-col gap-3 text-black h-full justify-center items-center">
      {form.profile ? (
        <StaticImage
          src={form.profile}
          width={110}
          height={110}
          className="rounded-full cursor-pointer"
          alt="Profile"
          onClick={() => imgRef.current?.click()}
        />
      ) : (
        <div
          onClick={() => imgRef.current?.click()}
          className="flex items-center cursor-pointer justify-center border-[3px] h-28 w-28 p-1 rounded-full border-dashed"
        >
          <FaCamera size={23} className="text-neutral-400" />
        </div>
      )}

      <UserForm
        value={form.name}
        name="name"
        placeholder="Enter name"
        label="Name"
        onChange={handleForm}
        icon={FaRegUserCircle}
      />
      <UserForm
        value={form.email}
        name="email"
        placeholder="Enter email"
        label="Email"
        icon={MdOutlineAlternateEmail}
        onChange={handleForm}
      />
      <UserForm
        value={form.number}
        name="number"
        placeholder="Enter number"
        label="Number"
        onChange={handleForm}
        icon={FaPhone}
      />
      <input
        type="file"
        ref={imgRef}
        onChange={handleImage}
        accept="image/png, image/jpeg"
        hidden
      />
      <Flex className="gap-3 items-center">
        <Switch
          checked={form.isSeller}
          color="yellow"
          onChange={() => setForm({ ...form, isSeller: !form.isSeller })}
        />
        <Paragraph fontJakarta className="text-sm font-medium">
          Make user a seller
        </Paragraph>
      </Flex>
      <CustomButton
        variant="primary"
        disabled={!form.email || !form.name || !form.number || isLoading}
        isloading={isLoading}
        onClick={add}
        className="w-full"
      >
        Add
      </CustomButton>
    </Flex>
  );
};

export default AddUser;
