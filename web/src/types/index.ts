export type CartType = {
  items: Array<object>;
  isOpen: boolean;
  totalQty: number;
  totalPrice: number;
};

export type UserType = {
  userId: string;
  name: string;
  email?: string;
  username: string;
  profile: object;
};

export type ProductType = {
  productId: string;
  userId: string;
  name: string;
  desc: string;
  price: string;
  collection: string;
  category: string;
  model: string;
  image: Array<object>;
  quantity: string;
  brand: string;
  slug: string;
  priceHistroy: Array<object>;
  views: Array<object>;
  reviews: Array<object>;
  rating: Array<number>;
  isPromoted: boolean;
};

export type VoucherType = {
  voucherId: string;
  code: string;
  discount: number;
  usedBy: Array<string>;
  hasLimit: boolean;
  validTill: string;
};

export type OrderType = {
  orderId: string;
  userId: string;
  products: Array<ProductType>;
  totalPrice: number;
  status: "pending" | "proessing" | "complete";
  deliveryStatus: string;
};

export type TranscationType = {
  transcationId: string;
  userId: string;
  amount: string;
  type: string;
  status: "pending" | "success" | "failed";
};

export type FlashSaleType = {
  salesId: string;
  productId: string;
  product: Array<ProductType>;
  price: number;
  discount: number;
  validTill: boolean;
  isPromoted: boolean;
  isAvaiable: boolean;
  availableForSale: number;
};
