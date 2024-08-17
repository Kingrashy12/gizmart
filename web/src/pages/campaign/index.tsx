import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React from "react";
import { ContainerClass, ProductSlugClass } from "../class";
import { Campaigns } from "@/components";

const Campaign = () => {
  return (
    <main
      className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
    >
      <Head>
        <title>Campaigns - Gizmart</title>
      </Head>
      <Campaigns />
    </main>
  );
};

export default Campaign;
