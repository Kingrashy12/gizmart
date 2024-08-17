import { RiAtLine, RiLockPasswordLine, RiPhoneLine } from "@remixicon/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CustomButton from "../CustomButton";
import AuthInput from "../form/AuthInput";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { loginWithEmail, loginWithNumber } from "@/redux/thunks/auth";

const LoginForm = () => {
  const [type, setType] = useState("email");
  const authState = useAppSelector((state) => state.auth);
  const isLoading = authState.loginStatus === "pending";
  const dispatch = useAppDispatch();
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

  function login() {
    if (type === "email") {
      dispatch(loginWithEmail(form));
    } else if (type === "number") {
      dispatch(loginWithNumber(form));
    }
  }

  function submit() {
    if ((type === "email" && err) || (type === "email" && !form.email)) {
      toast.error(`Enter a valid email address`);
    } else if (type === "number" && form.number.length > 11) {
      toast.error(`Enter a valid phone number`);
    } else {
      login();
    }
  }

  function onKeyLogin(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit();
    }
  }

  return (
    <div className="flex flex-col gap-3 max-[480px]:w-full">
      <TabGroup>
        <TabList variant="solid" color="yellow">
          <Tab
            icon={RiAtLine}
            disabled={isLoading}
            onClick={() => setType("email")}
            className={isLoading ? "cursor-not-allowed" : ""}
          >
            Email
          </Tab>
          <Tab
            icon={RiPhoneLine}
            disabled={isLoading}
            onClick={() => setType("number")}
            className={isLoading ? "cursor-not-allowed" : ""}
          >
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
        onkeyUp={(e) => onKeyLogin(e)}
      />
      <CustomButton
        disabled={isLoading}
        isloading={isLoading}
        onClick={submit}
        variant="primary"
        className="h-12 mt-2"
      >
        Login
      </CustomButton>
    </div>
  );
};

export default LoginForm;
