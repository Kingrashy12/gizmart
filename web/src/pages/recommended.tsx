import Head from "next/head";
import React from "react";
import { ContainerClass } from "./class";
import { poppinsFont } from "@/lib/fonts/font";
import { RecommendedProduct } from "@/components";

const Recommended = () => {
  return (
    <main
      className={`${ContainerClass} mt-[120px] max-[480px]:mt-[6.5rem] p-16 max-[1024px]:p-7 flex-1 max-[830px]:p-5 max-[700px]:p-0 ${poppinsFont.className}`}
    >
      <Head>
        <title>Recommended - Gizmart</title>
      </Head>
      <RecommendedProduct />
    </main>
  );
};
export default Recommended;
