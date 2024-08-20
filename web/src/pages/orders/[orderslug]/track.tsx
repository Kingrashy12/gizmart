import React, { lazy, Suspense } from "react";
import { ContainerClass, ProductListPage_Class } from "@/class";
import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
// import { RequestError } from "@/lib";
import { RiRestartLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { BackgroundLoader, PackageHistory } from "@/components";
import { fetch_order } from "@/helper/fetch.action";
import toast from "react-hot-toast";
import { API_URL } from "@/constants";

type OrderSlugProps = {
  order: OrderType;
  fetchedError: string;
  hasFailed: boolean;
};

const RequestError = lazy(() => import("@/lib/components/RequestError"));

const Track = ({ hasFailed, fetchedError, order }: OrderSlugProps) => {
  const router = useRouter();
  return (
    <Suspense fallback={<BackgroundLoader />}>
      <main
        className={`${ContainerClass} ${ProductListPage_Class} p-5 ${poppinsFont.className}`}
      >
        <Head>
          <title>Package History - Gizmart</title>
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
          <PackageHistory order={order} />
        )}
      </main>
    </Suspense>
  );
};

export default Track;

export const getStaticProps: GetStaticProps = async (context) => {
  const { orderslug } = context.params!;
  let hasFailed = false;
  try {
    const order = await fetch_order(orderslug);
    return {
      props: { order },
    };
  } catch (error: any) {
    hasFailed = true;
    toast.error(error.response?.data);
    const fetchedError = error.response?.data;
    return {
      props: { hasFailed, fetchedError },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/order/all`);
  const orders = await res.json();

  const paths = orders.map((order: OrderType) => ({
    params: { orderslug: order.slug },
  }));

  return { paths, fallback: true };
};
