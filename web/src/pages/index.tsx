import { poppinsFont } from "@/lib/fonts/font";
import {
  BackgroundLoader,
  // Collections,
  FlashSales,
  // HeroSection,
  HighDiscount,
  // ProductSection,
} from "@/components";
import { ContainerClass } from "./class";
import Head from "next/head";
import { useAppSelector } from "@/hooks/store";
import { Suspense, useEffect, lazy } from "react";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";

const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const Collections = lazy(() => import("@/components/home/Collections"));
const ProductSection = lazy(() => import("@/components/home/ProductSection"));

export default function Home() {
  const productState = useAppSelector((state) => state.product);
  const isFetching = productState.fetchStatus === "pending";
  const { onOpen, onClose } = useBackgroundLoader();

  useEffect(() => {
    if (isFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [isFetching]);
  return (
    <Suspense fallback={<BackgroundLoader />}>
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
            {/* <FlashSales /> */}
            {/* <HighDiscount /> */}
          </div>
        </div>
      </main>
    </Suspense>
  );
}
