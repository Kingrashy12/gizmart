import { DOMAttributes } from "react";

declare type TextProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fontPoppins?: boolean;
  fontRoboto?: boolean;
  fontInter?: boolean;
  fontJakarta?: boolean;
  fontWeight?: "semi-bold" | "bold" | "medium" | "normal";
  dangerouslySetInnerHTML?: DOMAttributes;
};
