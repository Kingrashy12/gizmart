import React from "react";
import Flex from "./Flex";
import StaticImage from "./Image";
import { CampaignImage, No_Products } from "@/assets";
import Paragraph from "./Text/Paragraph";
type N_P_F_Type = {
  message: string;
  isCampaign?: boolean;
  className?: string;
};

const No_Products_Found = ({ message, isCampaign, className }: N_P_F_Type) => {
  return (
    <Flex className={`${className} flex-col gap-6 items-center justify-center`}>
      <StaticImage
        className={isCampaign ? "w-32 grow" : "w-20 grow"}
        src={isCampaign ? CampaignImage : No_Products}
        alt="No Products"
      />
      <Paragraph
        fontPoppins
        className="text-neutral-700 text-center"
        fontWeight="medium"
      >
        {message}
      </Paragraph>
    </Flex>
  );
};

export default No_Products_Found;