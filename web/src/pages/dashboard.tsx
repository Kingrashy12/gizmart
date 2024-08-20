import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React from "react";
import { ContainerClass, ProductSlugClass } from "@/class";
import { Dashboard } from "@/components";

const dashboard = () => {
  return (
    <main
      className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
    >
      <Head>
        <title>Dashboard - Gizmart</title>
      </Head>
      <Dashboard />
    </main>
  );
};

export default dashboard;
