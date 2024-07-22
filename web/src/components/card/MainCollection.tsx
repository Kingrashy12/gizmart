import { collectionlinks } from "@/constants/link";
import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import CollectionCard from "./CollectionCard";

const MainCollection = () => {
  return (
    <div className="flex justify-center w-full gap-5 max-[920px]:hidden">
      {/* <Fade direction="left" cascade> */}
      <Zoom cascade>
        {collectionlinks.map((link, index) => (
          <CollectionCard
            key={index}
            url={link.url}
            label={link.label}
            imageSrc={link.image}
            direction="down"
          />
        ))}
      </Zoom>
      {/* </Fade> */}
    </div>
  );
};

export default MainCollection;
