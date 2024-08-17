import All_Product from "@/components/card/products/All_Product";
import CategoryCard from "@/components/card/products/CategoryCard";
import CollectionPageHeader from "@/components/indicator/CollectionPageHeader";
import { Flex, No_Products_Found } from "@/lib";
import { useRouter } from "next/router";
import React from "react";

interface ContainerProps {
  collectionName: string;
  products: ProductType[];
}

const Container = ({ collectionName, products }: ContainerProps) => {
  const router = useRouter();
  const { collectionId } = router.query;

  return (
    <Flex className="flex-col mt-6 max-[480px]:gap-5">
      {collectionId === "smart-watch" ? null : (
        <CollectionPageHeader label={collectionName} />
      )}
      <Flex className="flex-col gap-7 p-16 max-[1024px]:p-7 max-[830px]:p-5 max-[700px]:p-1 items-center justify-center">
        {collectionId === "smart-watch" ? null : <CategoryCard />}
        <Flex className="gap-3 flex-wrap max-[480px]:p-4">
          {products.length < 1 ? (
            <No_Products_Found
              message={`No products found for ${collectionName} collections`}
            />
          ) : (
            products.map((product, index) => (
              <All_Product product={product} key={index} />
            ))
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Container;
