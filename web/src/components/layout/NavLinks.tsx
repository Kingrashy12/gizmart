import { poppinsFont } from "@/lib/fonts/font";
import React from "react";
import NavTab from "../tab/NavTab";
import { navlinks } from "@/constants/link";
import { Fade } from "react-awesome-reveal";

const NavLinks = () => {
  return (
    <div className="flex p-3 items-center gap-3 max-[480px]:gap-5 whitespace-nowrap no-scrollbar w-full relative px-10 justify-between overflow-x-auto max-[700px]:px-5">
      {/* <div className="flex items-center gap-2">
        <p className={`font-semibold ${poppinsFont.className}`}>
          All collection
        </p>
      </div> */}
      <Fade direction="down" cascade>
        {navlinks.map((link, index) => (
          <NavTab
            key={index}
            label={link.label}
            url={link.url}
            className="text-[13px] whitespace-nowrap hover:underline"
          />
        ))}
      </Fade>
    </div>
  );
};

export default NavLinks;
