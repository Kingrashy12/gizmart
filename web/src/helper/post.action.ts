import { API_URL } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";

export async function createChat(senderId: string, receiverId: string) {
  try {
    const chat = await axios.post(`${API_URL}/chats/create`, {
      senderId,
      receiverId,
    });
    return chat.data;
  } catch (error: any) {
    toast.error(error.response.data);
    console.log(error.response.data);
  }
}

export async function SendMessage(form: MessageForm) {
  try {
    const message = await axios.post(`${API_URL}/messages/send`, {
      chatId: form.chatId,
      senderId: form.senderId,
      message: form.message,
      images: form.images,
    });
    return message.data;
  } catch (error: any) {
    toast.error(error.response.data);
    console.log(error.response.data);
  }
}

export async function create_order(body: CheckOutBody) {
  const order = await axios.post(`${API_URL}/order/checkout`, {
    userId: body.userId,
    products: body.products,
    eachQuantity: body.eachQuantity,
    totalPrice: body.totalPrice,
    payment_method: body.payment_method,
    delivery_address: body.delivery_address,
    voucherCode: body.voucherCode,
  });
  return order.data;
}

export async function generate_voucher(data: VoucherGenerationtype) {
  const voucher = await axios.post(`${API_URL}/voucher/new/${data.userId}`, {
    discountAmount: data.discountAmount,
    expiresAt: data.expiresAt,
    globalLimit: data.globalLimit,
    allProducts: data.allProducts,
    hasLimit: data.hasLimit,
    allowedProducts: data.allowedProducts,
    generatorId: data.generatorId,
  });

  return voucher.data;
}

export async function add_demo_user(form: DemoAccountFormType) {
  const user = await axios.post(`${API_URL}/demo/account/add/${form.userId}`, {
    name: form.name,
    email: form.email,
    number: form.number,
    isSeller: form.isSeller,
    profile: form.profile,
  });
  return user.data;
}

export async function demo_login(email: string) {
  const token = await axios.post(`${API_URL}/demo/account/login`, { email });
  return token.data;
}
