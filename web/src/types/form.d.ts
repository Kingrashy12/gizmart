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
  collection: string[];
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
