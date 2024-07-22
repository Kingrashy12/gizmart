import { collectionlinks } from "@/constants/link";
import React from "react";
import CollectionCard from "./CollectionCard";

const MobileCollection = () => {
  return (
    <div className="hidden whitespace-nowrap relative w-full max-[650px]:p-5 overflow-x-auto no-scrollbar gap-5 max-[920px]:flex">
      {collectionlinks.map((link, index) => (
        <CollectionCard
          key={index}
          url={link.url}
          label={link.label}
          imageSrc={link.image}
          direction="down"
        />
      ))}
    </div>
  );
};

export default MobileCollection;
