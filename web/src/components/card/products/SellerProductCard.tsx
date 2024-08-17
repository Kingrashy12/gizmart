import React, { useEffect } from "react";
import { FlexBetween, HeightDivider, Paragraph, StaticImage } from "@/lib";
import { Badge, TableCell, TableRow } from "@tremor/react";
import { nairaSym } from "@/styles/global";
import CustomButton from "@/components/CustomButton";
import { RiDeleteBinLine, RiEdit2Line } from "@remixicon/react";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { deleteProduct } from "@/redux/thunks/product";

interface SellerProductsProps {
  product: ProductType;
}

const SellerProductCard = ({ product }: SellerProductsProps) => {
  const productState = useAppSelector((state) => state.product);
  const userId = useAppSelector((state) => state.auth.userId);
  const isDeleting = productState.delete_status === "pending";
  const { onClose, onOpen } = useBackgroundLoader();
  const dispatch = useAppDispatch();
  const productName =
    product.name.length > 40 ? product.name.slice(0, 40) + "..." : product.name;

  useEffect(() => {
    if (isDeleting) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDeleting]);

  function DeleteProduct(productId: string) {
    dispatch(deleteProduct({ productId, userId }));
  }

  return (
    <TableRow className="w-auto">
      <TableCell>
        <StaticImage
          src={product.images[0].url}
          alt={product.name}
          className="w-[45px]"
          width={45}
          height={45}
        />
      </TableCell>
      <TableCell className=" w-[200px]">{productName}</TableCell>
      <TableCell
        dangerouslySetInnerHTML={{
          __html: nairaSym + product.price.toLocaleString(),
        }}
      />
      <TableCell>
        <Badge color="yellow">{product.total}</Badge>
      </TableCell>
      <TableCell>
        <Badge color="yellow">{product.quantity}</Badge>
      </TableCell>
      <TableCell className="flex gap-3">
        <CustomButton variant="primary" icon={RiEdit2Line}>
          Edit
        </CustomButton>
        <CustomButton
          onClick={() => DeleteProduct(product._id)}
          variant="danger"
          icon={RiDeleteBinLine}
        >
          Delete
        </CustomButton>
      </TableCell>
    </TableRow>
  );
};

export default SellerProductCard;
