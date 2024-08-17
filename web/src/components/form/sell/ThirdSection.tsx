import React from "react";
import { Flex, FlexBetween, Paragraph } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { NumberInput, TextInput } from "@tremor/react";
import { RiPriceTag3Fill } from "@remixicon/react";
import { SellProps } from "./CollectionSection";

const ThirdSection = ({ form, setForm }: SellProps) => {
  return (
    <FlexBetween
      className={`${poppinsFont.className} items-center gap-3 text-black font-medium text-sm`}
    >
      <Flex className="flex-col gap-2">
        <Paragraph>Quantity</Paragraph>
        <NumberInput
          className="p-[2px]"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          placeholder="Product quantity"
        />
      </Flex>
      <Flex className="flex-col gap-2">
        <Paragraph>Price</Paragraph>
        <NumberInput
          className="p-[2px]"
          icon={RiPriceTag3Fill}
          placeholder="Product price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          enableStepper={false}
        />
      </Flex>
    </FlexBetween>
  );
};

export default ThirdSection;
