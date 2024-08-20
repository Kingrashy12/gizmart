import { RequestHandler } from "express";
import OrderModel from "../models/Order";
import generateCode, { generateNumber } from "../utils/generateCode";
import VoucherModel from "../models/Voucher";
import ProductModel from "../models/Products";
import NotificationModel from "../models/Notification";
import UserModel from "../models/User";
import notifyUser from "../middleware/notifyUser";
import form_date_range from "../utils/format_date";

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalPrice,
      eachQuantity,
      payment_method,
      voucherCode,
      delivery_address,
    } = req.body;
    if (!userId || !products || !totalPrice)
      return res.status(403).json("Order fields is required");
    if (!payment_method)
      return res.status(403).json("Payment method is required");
    if (!delivery_address?.address)
      return res.status(400).json("Delivery address is required");
    let sellerId: string = "";
    products.forEach((product: any) => {
      sellerId = product?.userId;
    });
    const order = new OrderModel({
      userId,
      products,
      eachQuantity,
      totalPrice,
      payment_method,
      delivery_address,
      slug: generateCode(10),
      status: "pending",
      sellerId,
      orderNumber: generateNumber(10),
    });

    const notification = new NotificationModel({
      userId: sellerId,
      type: "orderReceived",
      notifyId: order.slug,
      body: `You have a new order with ID #${order.orderNumber}. Please review and confirm it.`,
      header: "New Order Received",
    });

    const countOccurrences = (products: any[], eachQuantity: any[]) => {
      // Create an object to store the count of each ID
      const idCounts: { [key: string]: number } = {};

      // Initialize counts for each ID in eachQuantity
      eachQuantity.forEach((id: string) => {
        idCounts[id] = 0; // Start with a count of 0
      });

      // Iterate over each ID in eachQuantity and count its occurrences in the products array
      eachQuantity.forEach((id: string) => {
        products.forEach((product) => {
          if (product._id === id) {
            idCounts[id] += 1;
          }
        });
      });

      return idCounts;
    };

    const qty = countOccurrences(products, eachQuantity);

    for (const id of Object.keys(qty)) {
      const count = qty[id];
      const product = await ProductModel.findById(id);

      if (!product || product.quantity < count) {
        return res
          .status(400)
          .json(`Product: ${product?.name.slice(0, 30)} is out of stock`);
      }

      await ProductModel.findByIdAndUpdate(id, {
        $inc: { quantity: -count },
      });
    }

    if (voucherCode) {
      await VoucherModel.findOneAndUpdate(
        { code: voucherCode },
        { $push: { usedBy: userId } }
      );
      const newOrder = await order.save();
      await notifyUser(sellerId, notification);
      res.status(201).json(newOrder);
    } else {
      const newOrder = await order.save();
      await notifyUser(sellerId, notification);
      res.status(201).json(newOrder);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
export const getUserOrders: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(403).json("userId is required");
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getOrder: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(403).json("Order slug is required");
    const order = await OrderModel.findOne({ slug });
    if (!order) return res.status(404).json("Order not found");
    res.status(200).json(order);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getMarchantsOrder: RequestHandler = async (req, res) => {
  try {
    const { marchantsId } = req.params;
    if (!marchantsId) return res.status(403).json("marchantsId is required");
    const orders = await OrderModel.find({ sellerId: marchantsId }).sort({
      createdAt: -1,
    });
    const activeOrders = orders.filter((order) => order.status !== "cancelled");
    res.status(200).json(activeOrders);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const CancelOrder: RequestHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json("OrderId is required");
    const cancelledOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { status: "cancelled" } },
      { new: true }
    );
    if (cancelledOrder) {
      const notification = new NotificationModel({
        userId: cancelledOrder?.sellerId,
        type: "orderCanceled",
        notifyId: cancelledOrder.slug,
        body: `The order with ID #${cancelledOrder.orderNumber} has been canceled by the customer.`,
        header: "Order Canceled",
      });
      await notifyUser(cancelledOrder.sellerId, notification);
    }
    res.status(200).json(cancelledOrder);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const confirmOrder: RequestHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { estimateddate } = req.body;
    if (!orderId) return res.status(400).json("OrderId is required");
    if (!estimateddate)
      return res.status(400).json("Estimated day of delivery is required");
    const formattedDate = form_date_range(estimateddate);
    const confirmedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { deliveryStatus: "Confirmed", status: "processing" } },
      { new: true }
    );
    if (confirmedOrder) {
      const userId = confirmedOrder?.userId;
      const notification = new NotificationModel({
        userId: userId,
        body: `Order #${confirmedOrder?.orderNumber} has been confirmed.  Expected to be delivered between: ${formattedDate}.`,
        type: "orderConfirmed",
        notifyId: confirmedOrder?.slug,
        header: "Order Confirmed",
      });
      await notifyUser(userId, notification);
      res.status(200).json(confirmedOrder);
    } else
      return res
        .status(400)
        .json("The order was not found or has been canceled.");
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const releaseOrder: RequestHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json("OrderId is required");
    const releasedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        $set: {
          deliveryStatus: "Out for delivery",
        },
      },
      { new: true }
    );
    if (releasedOrder) {
      const userId = releasedOrder?.userId;
      const notification = new NotificationModel({
        userId: userId,
        body: `Your order #${releasedOrder?.orderNumber} is out for delivery.`,
        type: "orderOutForDelivery",
        notifyId: releasedOrder?.slug,
        header: "Order Out for Delivery",
      });
      await notifyUser(userId, notification);
      res.status(200).json(releasedOrder);
    } else
      return res
        .status(400)
        .json("The order was not found or has been canceled.");
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const completeOrder: RequestHandler = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json("OrderId is required");
    const completedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { deliveryStatus: "Delivered", status: "completed" } },
      { new: true }
    );
    if (completedOrder) {
      const userId = completedOrder?.userId;
      const notification = new NotificationModel({
        userId: userId,
        body: `Your order #${completedOrder.orderNumber} has been delivered. We hope you enjoy your purchase!`,
        type: "orderDelivered",
        notifyId: completedOrder?.slug,
        header: "Order Delivered",
      });
      await notifyUser(userId, notification);
      res.status(200).json(completedOrder);
    } else
      return res
        .status(400)
        .json("The order was not found or has been canceled.");
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
