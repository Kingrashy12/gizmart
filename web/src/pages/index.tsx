import { poppinsFont } from "@/lib/fonts/font";
import {
  Collections,
  FlashSales,
  HeroSection,
  HighDiscount,
  ProductSection,
} from "@/components";
import { ContainerClass } from "./class";
import Head from "next/head";

export default function Home() {
  return (
    <main
      className={`${ContainerClass} mt-[120px] flex-1 max-[480px]:mt-[6.5rem] ${poppinsFont.className}`}
    >
      <Head>
        <title>Home - Gizmart</title>
      </Head>
      <div className="flex flex-col w-full relative">
        <HeroSection />
        <div className="flex flex-col justify-center w-full gap-16 p-20 items-center h-full max-[650px]:p-0 max-[920px]:p-10">
          <Collections />
          <ProductSection />
          <FlashSales />
          <HighDiscount />
        </div>
      </div>
    </main>
  );
}
