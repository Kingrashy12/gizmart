import React from "react";
import Paragraph from "./Text/Paragraph";
import Flex from "./Flex";
import StaticImage from "./Image";
import { Not_Found_404 } from "@/assets/svg";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

interface Not_404_Props {
  label: string;
  className?: string;
  subLabel?: string;
  hasButton?: boolean;
  buttonIcon?: any;
  buttonLabel?: string;
  buttonUrl?: string | any;
  buttonHasLink?: boolean;
}

const Not_Found = ({
  className,
  label,
  subLabel,
  hasButton,
  buttonIcon,
  buttonLabel,
  buttonHasLink,
  buttonUrl,
}: Not_404_Props) => {
  return (
    <Flex className={`${className} items-center justify-center flex-col gap-3`}>
      <StaticImage
        src={Not_Found_404}
        className="w-[150px] h-[150px]"
        alt="Not found"
      />
      <Paragraph
        fontRoboto
        fontWeight="semi-bold"
        className="text-black text-xl"
      >
        {label}
      </Paragraph>
      <Paragraph fontPoppins className="mt-2 text-sm text-neutral-700">
        {subLabel}
      </Paragraph>
      {hasButton ? (
        buttonHasLink ? (
          <Link href={buttonUrl}>
            <CustomButton className="mt-2" variant="primary" icon={buttonIcon}>
              {buttonLabel}
            </CustomButton>
          </Link>
        ) : (
          <CustomButton className="mt-2" variant="primary" icon={buttonIcon}>
            {buttonLabel}
          </CustomButton>
        )
      ) : null}
    </Flex>
  );
};

export default Not_Found;
