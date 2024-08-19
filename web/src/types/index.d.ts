declare type AccountType = "buyer" | "seller" | "marchant" | "";
declare type SettingsCurrentType = "password" | "email" | "info" | "";

declare type PasswordInputType = {
  placeholder: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
  error?: boolean | any;
  errMessage?: string;
  icon?: any;
  type?: "number" | "password" | "email" | "search" | "text" | "url";
};
declare type Notification_Type =
  | "orderReceived"
  | "orderConfirmed"
  | "orderCanceled"
  | "orderOutForDelivery"
  | "orderDelivered"
  | "payment"
  | "shipping"
  | "message"
  | "review"
  | "promotion"
  | "system"
  | "warning";

declare type UserType = {
  _id: string;
  name: string;
  email: string;
  profile: object;
  number: string | any;
  isAdmin: boolean;
  isSeller: boolean;
  isVerified: boolean;
  isNumberVerified: boolean;
  slug: string;
};

declare type ProductType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  price: string;
  subcategory: string;
  category: string;
  images: Array<any>;
  quantity: number | string;
  total: number;
  brand: string;
  slug: string;
  color: string;
  priceHistroy: Array<object>;
  views: Array<object>;
  reviews: Array<object>;
  rating: Array<number>;
  delivery_fee: number;
  isPromoted: boolean;
  createdAt: string | Date;
  // seller
  sellerSlug: string;
  sellerProfile: any;
  sellerName: string;
  isSellerVerified: boolean;
  sellerTotalProducts: number;
};

declare type VoucherType = {
  /**
   * Unique identifier for the voucher
   */
  _id: string;
  /**
   * Code for the voucher
   */
  code: string;
  /**
   * Indicates whether the voucher has a usage limit
   * @param hasLimit Boolean flag specifying if there is a limit on the number of times the voucher can be used.
   */
  hasLimit: boolean;
  /**
   * Expiration date for the voucher
   */
  expiresAt: string;
  /**
   * Total limit the voucher can be used `(ex. 500)`
   */
  globalLimit: number;
  /**
   * List of users that have used the voucher
   * @param usedBy Array of user IDs who have redeemed the voucher.
   */
  usedBy: Array<string>;
  /**
   * Indicates whether the voucher is currently active
   */
  isActive: boolean;
  /**
   * Indicates whether the voucher applies to all products
   */
  allProducts: boolean;
  /**
   * List of products the voucher is allowed for
   */
  allowedProducts: Array<string>;
  /**
   * Type of discount (e.g. percentage, fixed amount)
   */
  discountType?: string;
  /**
   * Amount of discount
   */
  discountAmount: number;
  /**
   * Creation date for the voucher
   */
  createdAt: string | Date;
};

declare type OrderType = {
  _id: string;
  userId: string;
  products: Array<ProductType>;
  eachQuantity: string[];
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  deliveryStatus: "Pending" | "Confirmed" | "Out for delivery" | "Delivered";
  payment_method: string;
  createdAt: string | Date | any;
  slug: string;
  orderNumber: string;
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

declare type EarningsChartType = {
  chartData: any[];
  category: string[];
  earned: number;
  header: string;
};

declare type DonutChartType = {
  chartData: any[];
  category: string[] | string | any;
  categories: string[];
  colors?: string[];
};

declare type NotificationType = {
  _id: string;
  userId: string;
  body: string;
  header: string;
  seen: boolean;
  notifyId: string;
  createdAt: string;
  type: Notification_Type;
};

declare type UserProfileType = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: string;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  api_key: string;
};

declare type ChatMemberType = {
  name: string;
  profile: UserProfileType;
  isVerified: boolean;
  _id: string;
};
