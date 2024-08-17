import { collectionsdata, productsCollection } from "@/data/category";
import { Flex, Paragraph } from "@/lib";
import {
  DatePicker,
  MultiSelect,
  MultiSelectItem,
  NumberInput,
  TextInput,
} from "@tremor/react";
import React, { useState } from "react";
interface VoucherFormProps {
  forAllProducts: boolean;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: any;
  setForm: any;
}
type Categories = {
  label: string;
  value: string;
};

export type Collection = {
  collection: string;
  value: string;
  categories: Categories[];
};

const VoucherForm = ({
  forAllProducts,
  handleFormChange,
  form,
  setForm,
}: VoucherFormProps) => {
  const [selectedCollection, setSelectedCollection] = useState([]);

  const handleCollectionChange = (collection: any) => {
    setSelectedCollection(collection);
    setForm({ ...form, allowedProducts: collection });
  };

  return (
    <Flex className="flex-col gap-4">
      {!form.allProducts && (
        <Flex className="flex-col gap-1">
          <Paragraph fontRoboto className="ml-1 text-sm">
            Allowed category
          </Paragraph>
          <MultiSelect
            placeholder="Select category..."
            onChange={handleCollectionChange}
            value={selectedCollection}
          >
            {collectionsdata.map((collection, index) => (
              <MultiSelectItem key={index} value={collection.value}>
                {collection.label}
              </MultiSelectItem>
            ))}
          </MultiSelect>
        </Flex>
      )}

      <Flex className="flex-col gap-1">
        <Paragraph fontRoboto className="ml-1 text-sm">
          Expires at
        </Paragraph>
        <DatePicker
          onValueChange={(value) => setForm({ ...form, expiresAt: value })}
        />
      </Flex>
      <Flex className="flex-col gap-1">
        <Paragraph fontRoboto className="ml-1 text-sm">
          Discount amount
        </Paragraph>
        <NumberInput
          placeholder="How many percent discount?"
          name="discountAmount"
          onChange={handleFormChange}
        />
      </Flex>
    </Flex>
  );
};

export default VoucherForm;
