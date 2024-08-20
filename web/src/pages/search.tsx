import Head from "next/head";
import React, { lazy, Suspense } from "react";
import { ContainerClass } from "./class";
import { poppinsFont } from "@/lib/fonts/font";
import { GetServerSideProps } from "next";
import { BackgroundLoader, Queried } from "@/components";
import { fetchProducts } from "@/helper/fetch.action";
import { useRouter } from "next/router";
import { RiRestartLine } from "react-icons/ri";
import { API_URL } from "@/constants";

interface SearchProps {
  products: ProductType[];
  query: string | any;
  hasFailed: boolean;
  fetchedError: string;
}
const RequestError = lazy(() => import("@/lib/components/RequestError"));
const Search = ({ products, query, hasFailed, fetchedError }: SearchProps) => {
  const router = useRouter();
  const empty = products.length < 1;
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} mt-[120px] max-[480px]:mt-[6.5rem] p-5 max-[700px]:p-0 ${poppinsFont.className}`}
      >
        <Head>
          <title>{empty ? "No result found!" : "Search - Gizmart"}</title>
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
          <Queried products={products} query={query} />
        )}
      </main>
    </Suspense>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  try {
    const products = await fetchProducts();
    const product = products.filter((p: ProductType) =>
      p.slug.includes(query as string)
    );

    return { props: { products: product, query } };
  } catch (error: any) {
    const hasFailed = true;
    const fetchedError = error.response?.data;

    return {
      props: { hasFailed, fetchedError },
    };
  }
};
