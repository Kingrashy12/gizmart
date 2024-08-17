import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React, { Suspense } from "react";
import { ContainerClass } from "../class";
import { BackgroundLoader, OrdersContainer } from "@/components";

const index = () => {
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} mt-[120px] max-[480px]:mt-[6.5rem] flex-1 ${poppinsFont.className}`}
      >
        <Head>
          <title>Orders - Gizmart</title>
        </Head>
        <OrdersContainer />
      </main>
    </Suspense>
  );
};

export default index;
// Run serversideprops here
