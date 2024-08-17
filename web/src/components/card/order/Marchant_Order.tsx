import React, { useEffect, useState } from "react";
import { FlexBetween, HeightDivider, Paragraph, StaticImage } from "@/lib";
import { Badge, TableCell, TableRow } from "@tremor/react";
import { nairaSym } from "@/styles/global";
import CustomButton from "@/components/CustomButton";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { deleteProduct } from "@/redux/thunks/product";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import {
  completeOrder,
  confirmOrder,
  releaseOrder,
} from "@/redux/thunks/order";
import ConfirmRelease from "./ConfirmRelease";

interface SellerProductsProps {
  product: ProductType;
  order: OrderType;
}

const Marchant_Order = ({ product, order }: SellerProductsProps) => {
  const orderSate = useAppSelector((state) => state.order);
  const userId = useAppSelector((state) => state.auth.userId);
  const onConfirmLoading = orderSate.confirmStatus === "pending";
  const onReleaseLoading = orderSate.releaseStatus === "pending";
  const onCompleteLoading = orderSate.completeStatus === "pending";
  const productName =
    product.name.length > 40 ? product.name.slice(0, 40) + "..." : product.name;
  const { onClose, onOpen } = useBackgroundLoader();
  const dispatch = useAppDispatch();
  const pending = order.deliveryStatus === "Pending";
  const confirmed = order.deliveryStatus === "Confirmed";
  const isOut = order.deliveryStatus === "Out for delivery";
  const completed = order.deliveryStatus === "Delivered";
  const [openConfirmationDailog, setOpenConfirmationDialog] = useState(false);
  useEffect(() => {
    if (onConfirmLoading || onReleaseLoading || onCompleteLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [onConfirmLoading, onReleaseLoading, onCompleteLoading]);

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
      <TableCell className=" w-[200px] text-black">{productName}</TableCell>
      <TableCell
        className="text-black"
        dangerouslySetInnerHTML={{
          __html: nairaSym + order.totalPrice.toLocaleString(),
        }}
      />
      <TableCell>
        <Badge color="yellow">{order.eachQuantity.length}</Badge>
      </TableCell>
      {/* <TableCell>
        <Badge color="yellow">{product.quantity}</Badge>
      </TableCell> */}
      <TableCell className="flex gap-3">
        <CustomButton
          onClick={() => setOpenConfirmationDialog(true)}
          variant="primary"
          icon={FaCheck}
          disabled={confirmed || isOut || completed}
        >
          Confirm
        </CustomButton>
        <CustomButton
          variant="pending"
          disabled={pending || isOut || completed}
          icon={LuPackageCheck}
          onClick={() => dispatch(releaseOrder(order._id))}
        >
          Out for delivery
        </CustomButton>
        <CustomButton
          variant="success"
          disabled={pending || confirmed || completed}
          icon={TbTruckDelivery}
          onClick={() => dispatch(completeOrder(order._id))}
        >
          Delivered
        </CustomButton>
      </TableCell>
      <ConfirmRelease
        order={order}
        open={openConfirmationDailog}
        closeDialog={() => setOpenConfirmationDialog(false)}
      />
    </TableRow>
  );
};

export default Marchant_Order;
