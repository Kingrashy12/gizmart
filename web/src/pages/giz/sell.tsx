import React from "react";
import { ContainerClass, ProductSlugClass } from "@/class";
import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import { SellFormModal } from "@/components";

const Sell = () => {
  return (
    <main
      className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
    >
      <Head>
        <title>Sell - Gizmart</title>
      </Head>
      <SellFormModal />
    </main>
  );
};

export default Sell;
