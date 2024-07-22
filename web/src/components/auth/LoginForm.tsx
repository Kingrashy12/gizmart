import { RiAtLine, RiLockPasswordLine, RiPhoneLine } from "@remixicon/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CustomButton from "../CustomButton";
import AuthInput from "../form/AuthInput";
import { Tab, TabGroup, TabList } from "@tremor/react";

const LoginForm = () => {
  const [type, setType] = useState("email");
  const [form, setForm] = useState({
    email: "",
    password: "",
    number: "",
  });

  const err = form.email && !form.email.includes("@gmail.com");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function submit() {
    if ((type === "email" && err) || (type === "email" && !form.email)) {
      toast.error(`Enter a valid email address`);
    } else if (
      (type === "number" && form.number.length > 11) ||
      form.number.length < 11
    ) {
      toast.error(`Enter a valid phone number`);
    } else {
      toast.success("Loading..");
    }
  }
  return (
    <div className="flex flex-col gap-3 max-[480px]:w-full">
      <TabGroup>
        <TabList variant="solid">
          <Tab icon={RiAtLine} onClick={() => setType("email")}>
            Email
          </Tab>
          <Tab icon={RiPhoneLine} onClick={() => setType("number")}>
            Number
          </Tab>
        </TabList>
      </TabGroup>
      {type === "email" ? (
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
      ) : (
        <AuthInput
          label="Number"
          type="number"
          placeholder="Enter number"
          value={form.number}
          onChange={handleChange}
          name="number"
          icon={RiPhoneLine}
        />
      )}
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter password"
        value={form.password}
        icon={RiLockPasswordLine}
        onChange={handleChange}
        name="password"
      />
      <CustomButton onClick={submit} variant="primary" className="h-12 mt-2">
        Login
      </CustomButton>
    </div>
  );
};

export default LoginForm;
