import { AuthImage, HeroImage } from "@/assets";
import { poppinsFont } from "@/lib/fonts/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { Paragraph } from "@/lib";
import CustomButton from "../CustomButton";
import { useDemoUsers } from "@/context/useDemo";

const Login_ = () => {
  const { onOpen } = useDemoUsers();
  return (
    <div className="flex w-full p-24 max-[480px]:p-10 h-full relative max-[1024px]:justify-center">
      <div className="flex flex-col w-[350px] gap-7 max-[768px]:w-[400px] max-[480px]:w-full">
        <div className="flex flex-col gap-3">
          <h1 className={`${poppinsFont.className} font-semibold text-2xl`}>
            Login to your account
          </h1>
        </div>
        <LoginForm />
        <p className={`${poppinsFont.className} font-medium text-center`}>
          Don&apos;t have an account?{" "}
          <Link
            className="text-primaryColor hover:underline"
            href="/account/sign-up"
          >
            Sign Up
          </Link>
        </p>
        <div className="flex gap-1 w-full items-center">
          <div className="border-b border-neutral-500 w-full" />
          <Paragraph fontPoppins className="text-neutral-600">
            Or
          </Paragraph>
          <div className="border-b border-neutral-500 w-full" />
        </div>
        <CustomButton onClick={onOpen} variant="primary">
          Login with demo user
        </CustomButton>
      </div>
      <Image
        src={HeroImage}
        alt="Welcome"
        className="w-[60%] h-full fixed right-0 top-0 max-[1024px]:hidden"
      />
    </div>
  );
};

export default Login_;
