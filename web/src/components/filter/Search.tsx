import { RiSearchLine } from "@remixicon/react";
import { TextInput } from "@tremor/react";
import React from "react";

interface SearchProps {
  className?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Id?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  className,
  placeholder,
  value,
  onChange,
  Id,
  onKeyUp,
}: SearchProps) => {
  return (
    <TextInput
      id={Id}
      className={className}
      value={value}
      onChange={onChange}
      icon={RiSearchLine}
      type="text"
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      // className=""
    />
  );
};

export default SearchInput;
