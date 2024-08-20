import Head from "next/head";
import React, { lazy, Suspense } from "react";
import { ContainerClass, ProductSlugClass } from "../class";
import { poppinsFont } from "@/lib/fonts/font";
import { BackgroundLoader, Current } from "@/components";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchAllProductSlugs, fetchProduct } from "@/helper/fetch.action";
// import { RequestError } from "@/lib";
import { RiRestartLine } from "@remixicon/react";
import { useRouter } from "next/router";

export interface ProductPage {
  product: ProductType;
  fetchedError: any;
  hasFailed: boolean;
}
const RequestError = lazy(() => import("@/lib/components/RequestError"));
const ProductSlug = ({ product, hasFailed, fetchedError }: ProductPage) => {
  const router = useRouter();
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} ${ProductSlugClass} ${poppinsFont.className}`}
      >
        <Head>
          <title>
            {hasFailed ? "Something went wrong" : product?.name} - Gizmart
          </title>
        </Head>
        {hasFailed ? (
          <RequestError
            message={fetchedError}
            hasButton
            buttonLabel="Refresh"
            buttonLabelIcon={RiRestartLine}
            buttonLabelClick={() => router.reload()}
          />
        ) : (
          <Current product={product} />
        )}
      </main>
    </Suspense>
  );
};

export default ProductSlug;

export const getStaticProps: GetStaticProps = async (context) => {
  const { productslug } = context.params!;
  let hasFailed = false;
  try {
    const product = await fetchProduct(productslug);
    return {
      props: { product },
      revalidate: 60, // Regenerate the page every 60 seconds if a request comes in
    };
  } catch (error: any) {
    hasFailed = true;
    const fetchedError = `${error.response?.data}`;
    return { props: { hasFailed, fetchedError } };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchAllProductSlugs();

  return {
    paths: slugs.map((slug: any) => ({
      params: { productslug: slug },
    })),
    fallback: true,
  };
};
