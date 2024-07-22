import { RiArrowDropUpLine, RiArrowUpLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React, { useEffect, useState } from "react";

// Define the styles directly or use a CSS module
const styles = {
  scrollToTop: {
    boxShadow: "0 9px 25px 0 rgba(132, 128, 177, 0.28)",
    border: "none",
  },
  active: {
    transform: "matrix(0.95, 0, 0, 0.95, 0, 0)",
  },
};

const scrollToTop = (smooth = false) => {
  if (smooth) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    document.documentElement.scrollTop = 0;
  }
};

const ScrollTop = ({
  top = 20,
  className = "",
  color = "black",
  smooth = false,
  component = "",
  viewBox = "0 0 256 256",
  svgPath = "M222.138,91.475l-89.6-89.6c-2.5-2.5-6.551-2.5-9.051,0l-89.6,89.6c-2.5,2.5-2.5,6.551,0,9.051s6.744,2.5,9.244,0L122,21.85  V249.6c0,3.535,2.466,6.4,6,6.4s6-2.865,6-6.4V21.85l78.881,78.676c1.25,1.25,2.992,1.875,4.629,1.875s3.326-0.625,4.576-1.875  C224.586,98.025,224.638,93.975,222.138,91.475z",
  width = "28",
  height = "28",
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(document.documentElement.scrollTop >= top);
    };
    onScroll();
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [top]);

  return (
    <>
      {visible && (
        <div
          className={`fixed bottom-7 right-7 z-5 items-center hover:opacity-75 rounded-full drop-shadow cursor-pointer justify-center bg-primaryColor ${className}`}
          onClick={() => scrollToTop(smooth)}
          aria-label="Scroll to top"
          style={styles.scrollToTop as any}
        >
          <Icon icon={RiArrowDropUpLine} size="lg" style={{ color: "white" }} />
        </div>
      )}
    </>
  );
};

export default ScrollTop;
