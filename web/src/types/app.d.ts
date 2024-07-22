declare type IconType = ReactElement<any, string | JSXElementConstructor<any>>;
declare type InputType =
  | "email"
  | "password"
  | "url"
  | "search"
  | "number"
  | "text";

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
};

declare type ButtonProps = {
  children: React.ReactNode;
  className?: React.CSSProperties<string>;
  style?: React.CSSProperties;
  variant: "primary" | "secondary" | "danger";
  onClick?: (e?: React.ChangeEvent) => void;
  disabled?: boolean;
  isloading?: boolean;
  icon?: IconType;
};
