import { Paragraph } from "@/lib";
import { NumberInput, Textarea, TextInput } from "@tremor/react";
import React from "react";

type EditFormType = {
  variant: "text" | "quantity" | "price" | "desc";
  value: string | number | any;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  name: string;
  icon?: any;
  placeholder: string;
  label: string;
};

const getForm = (
  variant: EditFormType["variant"],
  value: EditFormType["value"],
  onChange: EditFormType["onChange"],
  name: EditFormType["name"],
  className: EditFormType["className"],
  icon: EditFormType["icon"],
  placeholder: EditFormType["placeholder"],
  label: EditFormType["label"]
) => {
  switch (variant) {
    case "text":
      return (
        <div className="flex flex-col gap-2">
          <Paragraph fontPoppins className="ml-1 font-medium">
            {label}
          </Paragraph>
          <TextInput
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            icon={icon}
            className={className}
          />
        </div>
      );
    case "quantity":
      return (
        <div className="flex flex-col gap-2">
          <Paragraph fontPoppins className="ml-1 font-medium">
            {label}
          </Paragraph>
          <NumberInput
            name={name}
            value={value}
            onChange={onChange}
            icon={icon}
            className={className}
          />
        </div>
      );
    case "price":
      return (
        <div className="flex flex-col gap-2">
          <Paragraph fontPoppins className="ml-1 font-medium">
            {label}
          </Paragraph>
          <NumberInput
            enableStepper={false}
            name={name}
            value={value}
            onChange={onChange}
            icon={icon}
            className={className}
          />
        </div>
      );
    case "desc":
      return (
        <div className="flex flex-col gap-2">
          <Paragraph fontPoppins className="ml-1 font-medium">
            {label}
          </Paragraph>
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            className={className}
          />
        </div>
      );
  }
};

const ProductEditForm = ({
  value,
  variant,
  className,
  onChange,
  icon,
  name,
  placeholder,
  label,
}: EditFormType) => {
  return (
    <>
      {getForm(
        variant,
        value,
        onChange,
        name,
        className,
        icon,
        placeholder,
        label
      )}
    </>
  );
};

export default ProductEditForm;
