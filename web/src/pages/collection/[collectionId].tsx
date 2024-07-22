import { poppinsFont } from "@/lib/fonts/font";
import Head from "next/head";
import React from "react";
import { ContainerClass } from "../class";
import { GetServerSideProps } from "next";

interface CollectionProps {
  collection: string | any;
}

const Collection = ({ collection }: CollectionProps) => {
  return (
    <main className={`${ContainerClass} mt-36 flex-1 ${poppinsFont.className}`}>
      <Head>
        <title>Collection - Gizmart</title>
      </Head>
      <h1>Collection:{collection}</h1>
    </main>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionId } = context.query;

  return {
    props: { collection: collectionId },
  };
};
