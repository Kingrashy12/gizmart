import { AuthImage, HeroImage } from "@/assets";
import AuthInput from "@/components/form/AuthInput";
import { inter, poppinsFont } from "@/lib/fonts/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Form from "./Form";

const EmailSection = () => {
  return (
    <div className="flex w-full p-24 max-[480px]:p-10 h-full relative max-[1024px]:justify-center">
      <div className="flex flex-col w-[350px] gap-7 max-[768px]:w-[400px] max-[480px]:w-full">
        <div className="flex flex-col gap-3">
          <h1 className={`${poppinsFont.className} font-semibold text-2xl`}>
            Create an account
          </h1>
        </div>
        <Form />
        <p className={`${poppinsFont.className} font-medium text-center`}>
          Already have an account?{" "}
          <Link
            className="text-primaryColor hover:underline"
            href="/account/login"
          >
            Login
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

export default EmailSection;
