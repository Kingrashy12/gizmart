import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Paragraph, Flex, StaticImage } from "@/lib";
import React, { useEffect, useRef, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import Input from "../form/Input";
import { CgProfile } from "react-icons/cg";
import CustomButton from "../CustomButton";
import { FaPhoneAlt } from "react-icons/fa";
import { updateProfile } from "@/redux/thunks/auth";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import toast from "react-hot-toast";

const PersonalInfo: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<SettingsCurrentType>>;
}> = ({ exitCurrent }) => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const is_updating = authState.updateStatus === "pending";
  const { onClose, onOpen } = useBackgroundLoader();

  useEffect(() => {
    if (is_updating) {
      onOpen();
    } else {
      onClose();
    }
  }, [is_updating]);

  const [form, setForm] = useState({
    userId: user.userId,
    name: user.name,
    profile: user.profile,
    number: user.number,
    email: user.email,
  });

  const imgRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }
  const profile = form.profile?.url ? form.profile.url : form.profile;
  const issame =
    form.name !== user.name ||
    form.number !== user.number ||
    profile !== user.profile.url;

  function update() {
    if (form.profile?.url) {
      dispatch(
        updateProfile({
          userId: user.userId,
          name: form.name,
          number: form.number,
        })
      );
      //   toast.success("Yes");
    } else {
      //   toast.success("No");
      dispatch(updateProfile(form));
    }
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

  return (
    <Flex className="flex-col gap-3 text-black">
      <Flex className="gap-3 p-3 items-center rounded-t-lg bg-white border-b">
        <LuArrowLeft
          size={30}
          onClick={() => exitCurrent("")}
          className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <Paragraph fontPoppins className="text-lg font-semibold">
          Profile
        </Paragraph>
      </Flex>
      <Flex className="flex-col gap-3 p-3">
        <div className="flex flex-col items-center justify-center gap-3">
          <StaticImage
            src={form.profile.url ? form.profile.url : form.profile}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full"
          />
          <Paragraph
            fontRoboto
            onClick={() => imgRef.current?.click()}
            className="p-1 text-xs rounded-sm bg-neutral-300 text-black font-medium cursor-pointer hover:opacity-75"
          >
            Change profile
          </Paragraph>
        </div>
        <Input
          label="Name"
          name="name"
          icon={CgProfile}
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <Input
          label="Number"
          name="number"
          icon={FaPhoneAlt}
          type="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Enter number"
        />
        <CustomButton
          variant="primary"
          isloading={is_updating}
          onClick={update}
          disabled={!issame || is_updating}
        >
          Save
        </CustomButton>
        <input
          type="file"
          ref={imgRef}
          onChange={handleImage}
          hidden
          accept="image/png, image/jpeg"
        />
      </Flex>
    </Flex>
  );
};

export default PersonalInfo;
