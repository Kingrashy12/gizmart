import { AuthImage, HeroImage } from "@/assets";
import { poppinsFont } from "@/lib/fonts/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";

const Login_ = () => {
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
