import Head from "next/head";
import React, { lazy, Suspense } from "react";
import { ContainerClass, ProductListPage_Class } from "../class";
import { poppinsFont } from "@/lib/fonts/font";
import { GetStaticPaths, GetStaticProps } from "next";
import { BackgroundLoader, Brand_Store } from "@/components";
import { fetchProducts } from "@/helper/fetch.action";
import { useRouter } from "next/router";
import { RiRestartLine } from "react-icons/ri";
import { API_URL } from "@/constants";

interface BrandProps {
  brand: string;
  products: ProductType[];
  brand_slug: string;
  hasFailed: boolean;
  fetchedError: string;
}
const RequestError = lazy(() => import("@/lib/components/RequestError"));
const BrandName = ({
  brand,
  products,
  brand_slug,
  hasFailed,
  fetchedError,
}: BrandProps) => {
  const router = useRouter();
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} ${ProductListPage_Class} ${poppinsFont.className}`}
      >
        <Head>
          <title>{hasFailed ? "Something went wrong" : brand} - Gizmart</title>
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
          <Brand_Store
            products={products}
            brand={brand}
            brand_slug={brand_slug}
          />
        )}
      </main>
    </Suspense>
  );
};

export default BrandName;

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params!;
  try {
    const brand = name
      ?.toString()
      .split("-")
      .map((b) => b.slice(0, 1).toUpperCase() + b.slice(1))
      .join(" ");
    const products = await fetchProducts();
    const Products = products.filter(
      (product: ProductType) => product.brand === name
    );
    const brand_store = `${brand} Store`;

    return {
      props: { brand: brand_store, products: Products, brand_slug: name },
    };
  } catch (error: any) {
    const hasFailed = true;
    const fetchedError = error.response?.data;

    return {
      props: { hasFailed, fetchedError },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/products/`);
  const products = await res.json().catch((err) => console.log(err));

  const paths = products.map((product: ProductType) => ({
    params: { name: product.brand },
  }));

  return { paths, fallback: true };
};
