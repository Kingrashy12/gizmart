import { inter, poppinsFont } from "@/lib/fonts/font";
import { AuthInputProps } from "@/types/app";
import { RiAtLine } from "@remixicon/react";
import { TextInput } from "@tremor/react";
import React from "react";

const AuthInput = ({
  label,
  icon,
  value,
  onChange,
  type,
  placeholder,
  className,
  style,
  name,
  error,
  errorMessage,
  max,
  onkeyUp,
}: AuthInputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p
        className={`${poppinsFont.className} text-[13px] font-semibold ml-1 text-neutral-500`}
      >
        {label}
      </p>
      <TextInput
        icon={icon}
        placeholder={placeholder}
        type={type}
        className="h-12"
        value={value}
        onChange={onChange}
        name={name}
        error={error}
        errorMessage={errorMessage}
        max={max}
        onKeyUp={onkeyUp}
      />
    </div>
  );
};

export default AuthInput;
