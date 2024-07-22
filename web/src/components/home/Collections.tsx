"use client";

import React from "react";
import CollectionCard from "../card/CollectionCard";
import { collectionlinks } from "@/constants/link";
import { Fade } from "react-awesome-reveal";
import MainCollection from "../card/MainCollection";
import MobileCollection from "../card/MobileCollection";

const Collections = () => {
  const currentWidth = global?.window?.innerWidth;

  return (
    <>
      <MainCollection />
      <MobileCollection />
    </>
  );
};

export default Collections;
