import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React, { Suspense } from "react";
import { ContainerClass, ProductSlugClass } from "./class";
import { BackgroundLoader, Seller } from "@/components";

const Products = () => {
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
      >
        <Head>
          <title>Seller - Gizmart</title>
        </Head>
        <Seller />
      </main>
    </Suspense>
  );
};

export default Products;
