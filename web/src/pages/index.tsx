import { poppinsFont } from "@/lib/fonts/font";
import { Cart, Footer, Navbar } from "@/components";
import { ContainerClass } from "./class";
import Head from "next/head";

export default function Home() {
  return (
    <main className={`${ContainerClass} ${poppinsFont.className}`}>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar />

      <Cart />
      <Footer />
    </main>
  );
}
