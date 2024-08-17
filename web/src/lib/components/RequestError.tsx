import React from "react";
import Flex from "./Flex";
import StaticImage from "./Image";
import { CampaignImage, No_Products, RequestFailed } from "@/assets";
import Paragraph from "./Text/Paragraph";
import CustomButton from "@/components/CustomButton";
import HeaderOne from "./Text/HeaderOne";
type N_P_F_Type = {
  message: string;
  className?: string;
  buttonLabel?: string;
  buttonLabelClick?: () => void;
  buttonLabelIcon?: any;
  hasButton?: boolean;
};

const RequestError = ({
  message,
  className,
  buttonLabel,
  hasButton,
  buttonLabelClick,
  buttonLabelIcon,
}: N_P_F_Type) => {
  return (
    <Flex className={`${className} flex-col gap-6 items-center justify-center`}>
      <StaticImage
        // className={isCampaign ? "w-32 grow" : "w-20 grow"}
        className={"w-20"}
        src={RequestFailed}
        alt="No Products"
      />
      <HeaderOne fontPoppins className="font-semibold text-xl">
        Something went wrong!
      </HeaderOne>
      <Paragraph
        fontPoppins
        className="text-neutral-700 text-center"
        fontWeight="medium"
      >
        {message}
      </Paragraph>
      {hasButton && (
        <CustomButton
          variant="danger"
          icon={buttonLabelIcon}
          onClick={buttonLabelClick}
        >
          {buttonLabel}
        </CustomButton>
      )}
    </Flex>
  );
};

export default RequestError;
