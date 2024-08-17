import { fetchProducts } from "@/helper/fetch.action";
import { No_Products_Found } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { ContainerClass } from "@/pages/class";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { lazy, Suspense } from "react";
import { RiRestartLine } from "@remixicon/react";
import { useRouter } from "next/router";
import { BackgroundLoader } from "@/components";
import { API_URL } from "@/constants";

interface CategoryProps {
  subcategory: string;
  products: ProductType[];
  fetchedError: any;
  hasFailed: boolean;
}

const ListOff = lazy(() => import("@/components/card/products/ListOff"));
const RequestError = lazy(() => import("@/lib/components/RequestError"));
const Category = ({
  subcategory,
  products,
  hasFailed,
  fetchedError,
}: CategoryProps) => {
  const router = useRouter();
  const name = subcategory
    ?.split("-")
    ?.map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).replace(/\-/g, " "))
    .join(" ");
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} mt-[120px] max-[480px]:mt-[6.5rem] flex-1 p-5 max-[700px]:p-0 ${poppinsFont.className}`}
      >
        <Head>
          <title>{name} - Gizmart</title>
        </Head>
        {products?.length < 1 ? (
          <No_Products_Found
            message={`No products found for ${subcategory} category`}
          />
        ) : hasFailed ? (
          <RequestError
            message={fetchedError}
            hasButton
            buttonLabel="Refresh"
            buttonLabelIcon={RiRestartLine}
            buttonLabelClick={() => router.reload()}
          />
        ) : (
          <ListOff hasProductsFound products={products} pageName={`${name}`} />
        )}
      </main>
    </Suspense>
  );
};

export default Category;
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { subcategory } = context.params!;
    const products = await fetchProducts();
    const Products = products.filter(
      (product: ProductType) => product.subcategory === subcategory
    );

    return { props: { subcategory, products: Products } };
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
    params: { category: product.category, subcategory: product.subcategory },
  }));

  return { paths, fallback: true };
};
