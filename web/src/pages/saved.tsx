import { BackgroundLoader, SavedProducts } from "@/components";
import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React, { Suspense } from "react";
import { ContainerClass, ProductSlugClass } from "./class";

const saved = () => {
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
      >
        <Head>
          <title>Saved Products - Gizmart</title>
        </Head>
        <SavedProducts />
      </main>
    </Suspense>
  );
};

export default saved;
