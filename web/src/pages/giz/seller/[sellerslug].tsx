import { SellerInfo } from "@/components";
import { fetchSellerInfo } from "@/helper/fetch.action";
import { RequestError } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import {
  ContainerClass,
  ProductListPage_Class,
  ProductSlugClass,
} from "@/pages/class";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { RiRestartLine } from "@remixicon/react";
import { API_URL } from "@/constants";

interface SellerPageProps {
  pageName: string;
  sellerslug: string | any;
  hasFailed: boolean;
  fetchedError: any;
  // products:ProductType[]
}

const SellerPage = ({
  pageName,
  sellerslug,
  hasFailed,
  fetchedError,
}: SellerPageProps) => {
  const router = useRouter();
  return (
    <main
      className={`${ContainerClass} ${ProductListPage_Class} ${poppinsFont.className}`}
    >
      <Head>
        <title>{pageName} - Gizmart</title>
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
        <SellerInfo pageName={pageName} sellerslug={sellerslug} />
      )}
    </main>
  );
};

export default SellerPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { sellerslug } = context.params!;
  let hasFailed = false;
  try {
    const seller = await fetchSellerInfo(sellerslug);
    return { props: { pageName: seller.user.name, sellerslug } };
  } catch (error: any) {
    hasFailed = true;
    const fetchedError = `${error.message}`;
    console.log(error.message);
    return {
      props: { pageName: sellerslug, sellerslug, hasFailed, fetchedError },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/user/all`);
  const users = await res.json();

  const paths = users.map((user: UserType) => ({
    params: { sellerslug: user.slug },
  }));

  return { paths, fallback: false };
};
