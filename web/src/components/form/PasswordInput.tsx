import { Flex, Paragraph } from "@/lib";
import { TextInput } from "@tremor/react";
import React from "react";

const PasswordInput: React.FC<PasswordInputType> = ({
  value,
  placeholder,
  label,
  className,
  onChange,
  name,
  errMessage,
  error,
  disabled,
}) => {
  return (
    <Flex className="flex-col gap-2">
      <Paragraph fontInter className="font-medium text-sm ml-1">
        {label}
      </Paragraph>
      <TextInput
        value={value}
        placeholder={placeholder}
        type="password"
        onChange={onChange}
        className={className}
        name={name}
        error={error}
        errorMessage={errMessage}
        disabled={disabled}
      />
    </Flex>
  );
};

export default PasswordInput;
