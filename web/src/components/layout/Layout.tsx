import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "../ScrollTop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full h-full relative flex-col min-h-screen">
      <Navbar />
      {/* <div>{children}</div> */}
      {children}
      <ScrollTop />
      <Footer />
    </div>
  );
};

export default Layout;
