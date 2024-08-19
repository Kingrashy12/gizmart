import { Flex, Paragraph } from "@/lib";
import { TextInput } from "@tremor/react";
import React from "react";

const Input: React.FC<PasswordInputType> = ({
  value,
  placeholder,
  label,
  className,
  onChange,
  name,
  errMessage,
  error,
  icon,
  type,
}) => {
  return (
    <Flex className="flex-col gap-2">
      <Paragraph fontInter className="font-medium text-sm ml-1">
        {label}
      </Paragraph>
      <TextInput
        value={value}
        placeholder={placeholder}
        type={type}
        icon={icon}
        onChange={onChange}
        className={`text-black ${className}`}
        name={name}
        error={error}
        errorMessage={errMessage}
      />
    </Flex>
  );
};

export default Input;
