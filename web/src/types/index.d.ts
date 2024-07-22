declare type AccountType = "buyer" | "seller" | "marchant" | "";

declare type UserType = {
  _id: string;
  name: string;
  email?: string;
  username: string;
  profile: object;
  number: number | string;
  accountType: AccountType;
};

declare type ProductType = {
  _id: string;
  userId: string;
  name: string;
  desc: string;
  price: string;
  collection: string;
  category: string;
  model: string;
  images: Array<object>;
  quantity: string;
  brand: string;
  slug: string;
  color: string;
  priceHistroy: Array<object>;
  views: Array<object>;
  reviews: Array<object>;
  rating: Array<number>;
  isPromoted: boolean;
  createdAt: string | Date;
};

declare type VoucherType = {
  _id: string;
  code: string;
  hasLimit: boolean;
  expiresAt: string;
  uses: number;
  usedBy: Array<string>;
  isActive: boolean;
  allProducts: boolean;
  allowedProducts: Array<string>;
  discountType: string;
  discountAmount: number;
  createdAt: string | Date;
};

declare type OrderType = {
  _id: string;
  userId: string;
  products: Array<ProductType>;
  totalPrice: number;
  status: "pending" | "proessing" | "complete";
  deliveryStatus: string;
  createdAt: string | Date;
};

declare type TranscationType = {
  _id: string;
  userId: string;
  amount: string;
  type: string;
  status: "pending" | "success" | "failed";
  createdAt: string | Date;
};

declare type CampaignType = {
  _id: string;
  products: Array<ProductType>;
  discount: number;
  campaignName: string;
  speacialName: string;
  startDate: Date | string;
  endDate: Date | string;
  campaignImage: object | any;
  description: string;
  campaignTagline: string;
  createdAt: string | Date;
};
