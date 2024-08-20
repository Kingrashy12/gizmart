import Head from "next/head";
import React from "react";
import { ContainerClass, ProductSlugClass } from "@/class";
import { poppinsFont } from "@/lib/fonts/font";
import { Vouchers } from "@/components";

const Voucher = () => {
  return (
    <main
      className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
    >
      <Head>
        <title>Voucher - Gizmart</title>
      </Head>
      <Vouchers />
    </main>
  );
};

export default Voucher;

// Create a server fetch here
