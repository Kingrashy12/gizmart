import { BackgroundLoader, Marchants } from "@/components";
import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React, { Suspense } from "react";
import { ContainerClass, ProductSlugClass } from "../class";

const OrderManagement = () => {
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
      >
        <Head>
          <title>Order Management - Gizmart</title>
        </Head>
        <Marchants />
      </main>
    </Suspense>
  );
};

export default OrderManagement;
