declare type MessageForm = {
  senderId: string;
  chatId: string;
  message: string;
  images: any[];
};

declare type CheckOutBody = {
  userId: string;
  products: ProductType[];
  eachQuantity: string[];
  totalPrice: number;
  payment_method: string;
  delivery_address: AddressType;
  voucherCode: string;
};

declare type VoucherGenerationtype = {
  generatorId: string;
  userId: string;
  discountAmount: number;
  expiresAt: string | any;
  globalLimit: number;
  allProducts: boolean;
  hasLimit: boolean;
  allowedProducts: string[];
};

declare type ValidateVoucherType = {
  category: string[];
  userId: string;
  price: number;
  code: string;
};

declare type EditMessageBodyType = {
  messageId: string;
  userId: string;
  message: string;
};

declare type DeleteMessageType = {
  messageId: string;
  userId: string;
};
declare type EstType = {
  from: string;
  to: string;
};
declare type OrderReleaseType = {
  orderId: string;
  estimateddate: EstType;
};
declare type PasswordUpdateType = {
  userId: string;
  password: string;
  newPassword: string;
};
declare type ProfileUpdateType = {
  userId: string;
  name: string;
  number: string;
  profile?: any;
};
declare type EmailUpdateType = {
  userId: string;
  email: string;
};

declare type EditProductBodyType = {
  userId: string;
  productId: string;
  price?: number | any;
  name?: string;
  description?: string;
  quantity?: number | any;
};

declare type AddAddressFormType = {
  userId: string;
  state: string;
  city: string;
  address: string;
  current: boolean;
};

declare type DemoAccountFormType = {
  userId: string;
  email: string;
  number: string;
  isSeller: boolean;
  profile: string;
  name: string;
};
