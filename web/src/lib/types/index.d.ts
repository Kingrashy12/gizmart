declare type TextProps = {
  children: React.ReactNode;
  className?: React.CSSProperties | string | any;
  style?: React.CSSProperties;
  onClick?: () => void;
  fontPoppins?: boolean;
  fontRoboto?: boolean;
  fontWeight?: "semi-bold" | "bold" | "medium" | "normal";
};
