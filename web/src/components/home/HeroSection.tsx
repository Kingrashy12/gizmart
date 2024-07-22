"use client";

import React from "react";
import Image from "next/image";
import { HeroImage } from "@/assets";

const HeroSection = () => {
  return (
    <section className="w-full relative h-auto flex">
      <Image
        src={HeroImage}
        alt="hero"
        className="w-full h-[81vh] max-[1024px]:h-auto"
      />
    </section>
  );
};

export default HeroSection;
