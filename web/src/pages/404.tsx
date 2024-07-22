import { Lost } from "@/assets/svg";
import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col relative w-full items-center justify-center h-full mt-36 mb-28 flex-1 gap-5 px-5">
      <Head>
        <title>Not Found - Gizmart</title>
      </Head>
      <Image src={Lost} alt="Lost" className="w-[200px] h-auto" />
      <p
        className={`${poppinsFont.className} font-medium text-base text-neutral-500 text-center`}
      >
        Sorry, the page you are looking for does not exist. You can always go
        back to the{" "}
        <Link href="/" className="text-primaryColor hover:underline">
          homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
