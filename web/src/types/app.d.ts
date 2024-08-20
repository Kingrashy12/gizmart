import { StaticImageData } from "next/image";

declare type IconType = ReactElement<any, string | JSXElementConstructor<any>>;
declare type InputType =
  | "email"
  | "password"
  | "url"
  | "search"
  | "number"
  | "text";

declare type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

declare type AuthInputProps = {
  type: InputType;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: React.CSSProperties<string>;
  style?: React.CSSProperties;
  placeholder: string;
  icon?: IconType;
  label: string;
  name: string;
  error?: boolean | any;
  errorMessage?: string;
  max?: number;
  onkeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
};

declare type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant:
    | "primary"
    | "secondary"
    | "danger"
    | "transparent"
    | "success"
    | "pending";
  onClick?: (e?: React.ChangeEvent | any) => void;
  disabled?: boolean;
  isloading?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
};

declare type CustomIconType = {
  className?: string;
  iconClass?: string;
  titleClass?: string;
  title: string;
  icon: any;
  iconSize: IconSize;
  hasTitle?: boolean;
  titleWidth?: string;
  onClick?: () => void;
  disabled?: boolean;
  useCustom?: boolean;
  customIconSize?: number | any;
};
declare type CategoriesType = {
  url: string;
  image: StaticImageData | string;
  label: string;
};
declare type CategoryType = {
  header?: string;
  // categories: CategoriesType[];
};
