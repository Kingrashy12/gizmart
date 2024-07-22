"use client";
import { GizColumnLogo, GizRowLogo } from "@/assets";
import { footer } from "@/constants/link";
import { Divider } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const path = useRouter();
  const hideOnAuth =
    path.pathname === "/account/sign-up" || path.pathname === "/account/login";
  return (
    <div
      className={`${
        hideOnAuth ? "hidden" : "flex"
      } flex-col gap-2 w-full border-t border-t-neutral-300 select-none`}
    >
      <div className="flex p-16 justify-evenly w-full max-[460px]:flex-col gap-3 max-[680px]:p-5">
        <Image
          alt="Logo"
          src={GizColumnLogo}
          className="w-[100px] h-[80px] max-[650px]:w-[80px] max-[650px]:h-[50px]"
        />
        <Divider className="hidden max-[460px]:flex" />
        <div className={`${poppinsFont.className} flex flex-col`}>
          {footer.shop.map((sh, index) => (
            <div key={index} className="flex flex-col">
              <p className="font-semibold text-lg mb-3">{sh.header}</p>
              <Link
                href={sh.url}
                className="font-medium hover:underline text-blue-600 text-sm"
              >
                {sh.label}
              </Link>
            </div>
          ))}
        </div>
        <div className={`${poppinsFont.className} flex flex-col`}>
          {footer.need_help.map((sh, index) => (
            <div key={index} className="flex flex-col">
              <p className="font-semibold text-lg mb-3">{sh.header}</p>
              <Link
                href={sh.url}
                className="font-medium hover:underline text-blue-600 text-sm"
              >
                {sh.label}
              </Link>
            </div>
          ))}
        </div>
        <div className={`${poppinsFont.className} flex flex-col`}>
          {footer.contact.map((sh, index) => (
            <div key={index} className="flex flex-col">
              <p className="font-semibold text-lg mb-3">{sh.header}</p>
              <Link
                href={sh.url}
                className="font-medium hover:underline text-blue-600 text-sm"
              >
                {sh.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${poppinsFont.className} flex text-sm font-medium bg-black w-full p-9 justify-evenly flex-wrap`}
      >
        <p className=" text-neutral-500">© 2024 Gizmart</p>
        {/* <Link className="text-primaryColor hover:underline" href="/not-found">
          Privacy policy
        </Link> */}
      </div>
    </div>
  );
};

export default Footer;
