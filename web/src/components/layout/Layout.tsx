import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "../ScrollTop";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full h-full relative flex-col min-h-screen">
      {router.pathname === "/messages" ? null : <Navbar />}
      {/* <div>{children}</div> */}
      {children}
      <Analytics />
      <ScrollTop />
      {router.pathname === "/messages" ? null : <Footer />}
    </div>
  );
};

export default Layout;
