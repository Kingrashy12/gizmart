import { API_URL } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";

export async function UpgradeToSeller(userId: string) {
  const response = await axios.post(`${API_URL}/user/upgrade-to-seller`, {
    userId,
  });
  return response;
}

export async function ReadMessages(chatId: string) {
  try {
    const messages = await axios.patch(
      `${API_URL}/messages/read-all/${chatId}`
    );
    return messages.data;
  } catch (error: any) {
    toast.error(error.response.data);
    console.log(error.response.data);
  }
}

export async function validate_voucher(data: ValidateVoucherType) {
  const discountedPrice = await axios.patch(
    `${API_URL}/voucher/validate/${data.code}`,
    {
      collection: data.collection,
      userId: data.userId,
      price: data.price,
    }
  );

  return discountedPrice.data;
}

export async function edit_message(body: EditMessageBodyType) {
  const message = await axios.patch(`${API_URL}/messages/one/edit`, {
    messageId: body.messageId,
    userId: body.userId,
    message: body.message,
  });

  return message.data;
}

export async function delete_message(data: DeleteMessageType) {
  const message = await axios.patch(`${API_URL}/messages/one/delete`, {
    messageId: data.messageId,
    userId: data.userId,
  });
  return message.data;
}

export async function cancel_order(orderId: string) {
  const cancelledOrder = await axios.patch(
    `${API_URL}/order/cancel/${orderId}`
  );
  return cancelledOrder.data;
}
export async function confirm_order(data: OrderReleaseType) {
  const cancelledOrder = await axios.patch(
    `${API_URL}/order/confirm/${data.orderId}`,
    {
      estimateddate: data.estimateddate,
    }
  );
  return cancelledOrder.data;
}
export async function release_order(orderId: string) {
  const releasedOrder = await axios.patch(
    `${API_URL}/order/release/${orderId}`
  );
  return releasedOrder.data;
}
export async function complete_order(orderId: string) {
  const completedOrder = await axios.patch(
    `${API_URL}/order/complete/${orderId}`
  );
  return completedOrder.data;
}