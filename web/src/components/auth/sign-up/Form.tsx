import CustomButton from "@/components/CustomButton";
import AuthInput from "@/components/form/AuthInput";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Check } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { createUser } from "@/redux/thunks/auth";
import { RiAtLine, RiLockPasswordLine, RiPhoneLine } from "@remixicon/react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const [check, setChecked] = useState(false);
  const place_url =
    "https://res.cloudinary.com/dv4mozbaz/image/upload/v1720967261/rn2sru167p9ozlecnl15.png";
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    number: "",
    profile: "",
  });

  async function genProfile() {
    const image = await fetch(place_url);
    const blob = await image.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("result:", form);
      setForm({ ...form, profile: reader.result as any });
    };
    reader.readAsDataURL(blob);
  }

  useEffect(() => {
    genProfile();
  }, []);

  const err = form.email && !form.email.includes("@gmail.com");

  const authState = useAppSelector((state) => state.auth);
  const isLoading = authState.registerStatus === "pending";
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function submit() {
    if (!check) {
      toast.error(`Please accept  terms & conditions`);
    } else if (err) {
      toast.error("Plcae enter a valid email address");
    } else if (/[a-z]/.test(form.number)) {
      toast.error("Please enter a valid number");
    } else {
      dispatch(createUser(form));
    }
  }

  return (
    <div className="flex flex-col gap-3 max-[480px]:w-full">
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter email"
        icon={RiAtLine}
        value={form.email}
        onChange={handleChange}
        name="email"
        error={err}
        errorMessage="Invalid email"
      />
      <AuthInput
        label="Name"
        type="text"
        placeholder="Enter fullname"
        value={form.name}
        onChange={handleChange}
        name="name"
      />
      <AuthInput
        label="Number"
        type="number"
        placeholder="Enter number"
        value={form.number}
        onChange={handleChange}
        name="number"
        max={11}
        icon={RiPhoneLine}
        error={/[a-zA-Z]/.test(form.number)}
        errorMessage="Invalid number"
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter password"
        value={form.password}
        icon={RiLockPasswordLine}
        onChange={handleChange}
        name="password"
      />
      <div className="flex items-center gap-1 w-full">
        <Check enabled={check} setEnabled={() => setChecked(!check)} />
        <p
          className={`${poppinsFont.className} font-medium text-[13px] w-full`}
        >
          I have read and agreed to the{" "}
          <span className="text-primaryColor hover:underline cursor-pointer">
            Terms & Conditions
          </span>
        </p>
      </div>
      <CustomButton
        onClick={submit}
        variant="primary"
        className="h-12 mt-2"
        disabled={
          isLoading ||
          !form.name ||
          !form.email ||
          !form.number ||
          !form.password
        }
        isloading={isLoading}
      >
        Sign Up
      </CustomButton>
    </div>
  );
};

export default Form;
