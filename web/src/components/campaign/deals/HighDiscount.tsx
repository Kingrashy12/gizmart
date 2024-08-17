import DisplayCard from "@/components/card/products/DisplayCard";
import Wrapper from "@/components/card/Wrapper";
import { HeaderOne } from "@/lib";
import React from "react";

const HighDiscount = () => {
  return (
    <DisplayCard
      products={[]}
      allUrl="/deals/high-discount"
      headerLabel="HighDiscount Deals"
      noProducts
      noProductsMsg={"This section is still under developments"}
    />
  );
};

export default HighDiscount;
