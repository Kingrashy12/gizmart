"use-client";

import { RiArrowDropUpLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React, { useState } from "react";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document?.documentElement?.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    global?.window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  global?.window?.addEventListener("scroll", toggleVisible);

  return (
    <>
      {visible && (
        <div
          className={`fixed bottom-7 right-7 z-5 items-center hover:opacity-75 rounded-full drop-shadow cursor-pointer justify-center bg-primaryColor`}
          onClick={scrollToTop}
        >
          <Icon icon={RiArrowDropUpLine} size="lg" style={{ color: "white" }} />
        </div>
      )}
    </>
  );
};

export default ScrollTop;
