import { Flex } from "@/lib";
import React, { useEffect, useState } from "react";
import ProductEditForm from "../form/ProductEditForm";
import CustomButton from "../CustomButton";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { editProduct } from "@/redux/thunks/product";
import { getUpdatedValue } from "@/utils/func";

interface EditProps {
  product: ProductType;
}

const ProductEdit = ({ product }: EditProps) => {
  const editState = useAppSelector((state) => state.product);
  const isLoading = editState.editStatus === "pending";
  const { onClose, onOpen } = useBackgroundLoader();
  const userId = useAppSelector((state) => state.auth.userId);
  const [form, setForm] = useState({
    userId: userId,
    productId: product._id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    description: product.description,
  });

  useEffect(() => {
    if (isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [isLoading]);

  const dispatch = useAppDispatch();

  const issame =
    form.name == product.name &&
    form.description == product.description &&
    form.price == product.price &&
    form.quantity == product.quantity;

  function handleForm(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function edit() {
    if (form.price != product.price) {
      dispatch(editProduct(form));
    } else {
      dispatch(
        editProduct({
          userId,
          productId: product._id,
          name: form.name,
          description: form.description,
          quantity: form.quantity,
        })
      );
    }
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
      <CustomButton
        onClick={edit}
        variant="primary"
        disabled={issame || isLoading}
      >
        Save
      </CustomButton>
    </Flex>
  );
};

export default ProductEdit;
