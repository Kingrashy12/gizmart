import { MainLogo } from "@/assets";
import { StaticImage } from "@/lib";
import React from "react";

const BackgroundLoader = () => {
  return (
    <div className="fixed flex flex-col items-center justify-center z-[1000] w-full h-full bg-[rgb(0,0,0,0.5)] inset-0 top-0 bottom-0">
      <div className="p-5 rounded-full drop-shadow relative">
        <div className="loader_bg absolute top-0 left-0 w-full h-full rounded-full"></div>
        <StaticImage
          src={MainLogo}
          className="w-20 drop-shadow image-loader relative z-10"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default BackgroundLoader;
