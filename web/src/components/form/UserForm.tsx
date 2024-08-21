import { Flex, Paragraph } from "@/lib";
import { TextInput } from "@tremor/react";
import React from "react";

interface FormProps {
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder: string;
  label: string;
  icon?: any;
}

const UserForm = ({ ...props }: FormProps) => {
  return (
    <Flex className="flex-col gap-1">
      <Paragraph fontPoppins className="font-semibold text-xs ml-1">
        {props.label}
      </Paragraph>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        icon={props.icon}
      />
    </Flex>
  );
};

export default UserForm;
