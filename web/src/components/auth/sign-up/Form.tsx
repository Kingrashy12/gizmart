import CustomButton from "@/components/CustomButton";
import AuthInput from "@/components/form/AuthInput";
import { Check } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { RiAtLine, RiLockPasswordLine, RiPhoneLine } from "@remixicon/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const [check, setChecked] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    number: "",
  });

  const err = form.email && !form.email.includes("@gmail.com");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function submit() {
    if (!check) {
      toast.error(`Please accept  terms & conditions`);
    } else {
      toast.success("Loading..");
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
        label="Username"
        type="text"
        placeholder="Enter username"
        value={form.username}
        onChange={handleChange}
        name="username"
      />
      <AuthInput
        label="Number"
        type="number"
        placeholder="Enter number"
        value={form.number}
        onChange={handleChange}
        name="number"
        icon={RiPhoneLine}
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
        <p className={`${poppinsFont.className} font-medium text-sm`}>
          I have read and agreed to the{" "}
          <span className="text-primaryColor hover:underline cursor-pointer">
            Terms & Conditions
          </span>
        </p>
      </div>
      <CustomButton onClick={submit} variant="primary" className="h-12 mt-2">
        Sign Up
      </CustomButton>
    </div>
  );
};

export default Form;
