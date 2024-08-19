import { Flex } from "@/lib";
import React, { useState } from "react";
import ProductEditForm from "../form/ProductEditForm";
import CustomButton from "../CustomButton";

interface EditProps {
  product: ProductType;
}

const ProductEdit = ({ product }: EditProps) => {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    description: product.description,
  });

  const issame =
    form.name !== product.name ||
    form.description !== product.description ||
    form.price !== product.price ||
    form.quantity !== product.quantity;

  function handleForm(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <Flex className="flex-col p-3 gap-3">
      <ProductEditForm
        placeholder="Enter name"
        label="Name"
        name="name"
        value={form.name}
        onChange={handleForm}
        variant="text"
      />
      <ProductEditForm
        placeholder="Enter Description"
        label="Description"
        name="description"
        value={form.description}
        onChange={handleForm}
        variant="desc"
      />
      <Flex className="gap-2 items-center">
        <ProductEditForm
          placeholder="Enter Quantity"
          label="Quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleForm}
          variant="quantity"
        />
        <ProductEditForm
          placeholder="Enter Price"
          label="Price"
          name="price"
          value={form.price}
          onChange={handleForm}
          variant="price"
        />
      </Flex>
      <CustomButton variant="primary" disabled={!issame}>
        Save
      </CustomButton>
    </Flex>
  );
};

export default ProductEdit;
