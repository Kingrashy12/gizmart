import { Flex, HeaderOne } from "@/lib";
import { Dialog, DialogPanel } from "@tremor/react";
import React from "react";
import { IoClose } from "react-icons/io5";
import ProductEdit from "../products/ProductEdit";

interface EditProps {
  closeEdit: () => void;
  product: ProductType;
  isOpen: boolean;
}

const EditProduct = ({ closeEdit, product, isOpen }: EditProps) => {
  return (
    <Dialog open={isOpen} onClose={closeEdit} className="z-[600]">
      <DialogPanel
        className="p-0"
        style={{
          background: "white",
          borderStyle: "none",
          borderWidth: 0,
          borderColor: "white",
        }}
      >
        <Flex className="flex-col text-black gap-3">
          <Flex className="items-center justify-between border-b p-3">
            <HeaderOne className="font-semibold" fontJakarta>
              Edit Product
            </HeaderOne>
            <IoClose
              size={30}
              onClick={closeEdit}
              className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
            />
          </Flex>
          <ProductEdit product={product} />
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default EditProduct;
