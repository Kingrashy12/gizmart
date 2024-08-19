import { API_URL } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";

export async function fetchProduct(slug: string | any, userId?: string | any) {
  const product = await axios.get(
    `${API_URL}/products/one/${slug}/view/${userId}`
  );
  return product.data;
}

export async function fetchProducts() {
  const product = await axios.get(`${API_URL}/products`);
  return product.data;
}

export async function fetchSellerInfo(slug: string | any) {
  const seller = await axios.get(`${API_URL}/user/seller/${slug}`);
  return seller.data;
}

export async function get_vouchers(userId: string) {
  const vouchers = await axios.get(`${API_URL}/voucher/all/${userId}`);
  return vouchers.data;
}

export async function getUserById(userId: string) {
  try {
    const user = await axios.get(`${API_URL}/user/one/validate-id/${userId}`);
    return user.data;
  } catch (error: any) {
    toast.error(error.response.data);
    console.log(error.response.data);
  }
}

export async function fetchUserChats(userId: string) {
  const chats = await axios.get(`${API_URL}/chats/all/${userId}`);
  return chats.data;
}

export async function fetchMessages(chatId: string) {
  const messages = await axios.get(`${API_URL}/messages/all/${chatId}`);
  return messages.data;
}

export async function fetchActiveUsers() {
  const users = await axios.get(`${API_URL}/active-users`);
  return users.data;
}

export async function fetchUnreadMessages(chatId: string) {
  const unreadMessages = await axios.get(
    `${API_URL}/messages/all/unread/${chatId}`
  );
  return unreadMessages.data;
}

export async function fetch_orders(userId: string) {
  const orders = await axios.get(`${API_URL}/order/all/${userId}`);
  return orders.data;
}

export async function fetch_order(slug: string | any) {
  const order = await axios.get(`${API_URL}/order/one/${slug}`);
  return order.data;
}
export async function fetch_marchants_order(marchantsId: string | any) {
  const order = await axios.get(
    `${API_URL}/order/all/marchants/${marchantsId}`
  );
  return order.data;
}

export async function fetchAllProductSlugs() {
  const response = await fetch(`${API_URL}/products/`);
  const products = await response.json();
  return products.map((product: { slug: string }) => product.slug);
}
