import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React, { lazy, Suspense } from "react";
import { ContainerClass } from "../class";
import { GetStaticProps, GetStaticPaths } from "next";
import { BackgroundLoader, CollectionContainer } from "@/components";
import { fetchProducts } from "@/helper/fetch.action";
// import { RequestError } from "@/lib";
import { RiRestartLine } from "@remixicon/react";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";

interface CollectionProps {
  collection: string | any;
  products: ProductType[];
  fetchedError: any;
  hasFailed: boolean;
}
const RequestError = lazy(() => import("@/lib/components/RequestError"));
const Collection = ({
  collection,
  products,
  fetchedError,
  hasFailed,
}: CollectionProps) => {
  const router = useRouter();
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} mt-[120px] ${
          hasFailed && "p-4"
        } max-[480px]:mt-[6.5rem] flex-1 ${poppinsFont.className}`}
      >
        <Head>
          <title>Category - Gizmart</title>
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
          <CollectionContainer
            products={products}
            collectionName={collection}
          />
        )}
      </main>
    </Suspense>
  );
};

export default Collection;

export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params!;
  try {
    const products = await fetchProducts();
    const collectName = category?.toString();
    const cName = collectName
      ?.split(" ")
      .map((w) => w.toUpperCase().slice(0, 1) + w.slice(1).replace(/\-/g, " "))
      .join("");
    const Products = products.filter(
      (product: ProductType) => product.category === category
    );

    return {
      props: { collection: cName, products: Products },
    };
  } catch (error: any) {
    let hasFailed = false;
    hasFailed = true;
    const fetchedError = `${error.response?.data}`;
    return { props: { hasFailed, fetchedError } };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();

  const paths = products.map((product: ProductType) => ({
    params: { category: product.category },
  }));

  return { paths, fallback: true };
};
