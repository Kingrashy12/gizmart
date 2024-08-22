declare type StatusType = "pending" | "successful" | "failed" | "";

declare type CartState = {
  items: ProductType[];
  quantity: string[];
};

declare type AuthState = {
  token: string;
  userId: string;
  name: string;
  email: string;
  profile: UserProfileType | any;
  number: string;
  isAdmin: boolean;
  isSeller: boolean;
  type: string;
  isVerified: boolean;
  isNumberVerified: boolean;
  address: AddressType[];
  loginStatus: StatusType;
  loginError: string | any;
  registerStatus: StatusType;
  registerError: string | any;
  upgradeStatus: StatusType;
  upgradeError: string | any;
  mailUpdateStatus: StatusType;
  mailUpdateError: string | any;
  updateStatus: StatusType;
  updateError: string | any;
  userLoaded: boolean;
  addressStatus: StatusType;
  addressError: string | any;
};

// Context Types

declare type ContextProviderProps = {
  children: React.ReactNode;
};

declare type ModalContextTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  initializeAutoOpen?: (condition: boolean) => void;
};

declare type ProductStateType = {
  products: ProductType[];
  seller_products: ProductType[];
  discountDeals: ProductType[];
  campaignDeals: ProductType[];
  fetchStatus: StatusType;
  fetchError: string | any;
  createStatus: StatusType;
  createError: string | any;
  fetch_products_status: StatusType;
  fetch_products_error: string | any;
  delete_status: StatusType;
  delete_error: string | any;
  editStatus: StatusType;
  editError: string | any;
};

type Seller_Type = {
  _id: string;
  name: string;
  email: string;
  slug: string;
  number: number;
  isAdmin: boolean;
  isSeller: boolean;
  isVerified: boolean;
  isNumberVerified: boolean;
  profile: any;
  createdAt: string | any;
  products: string[];
};

type SellerType = {
  user: Seller_Type;
  products: ProductType[];
};

declare type UserStateType = {
  seller: SellerType;
  users: UserType[];
  demo_accounts: UserType[];
  fetch_seller_status: StatusType;
  fetch_seller_error: string | any;
  fetchStatus: StatusType;
  fetchError: string | any;
  addStatus: StatusType;
  addError: string | any;
};

declare type UserDataType = {
  _id: string;
  name: string;
  isVerified: boolean;
  profile: any;
};

declare type ChatType = {
  _id: string;
  members: ChatMemberType[];
};

declare type selectedChatType = {
  user: UserDataType;
  chat: {
    _id: string;
    members: ChatMemberType[];
  };
};

declare type ChatsStateType = {
  chats: ChatType[];
  created_chat: ChatType;
  selectedChat: selectedChatType;
  fetchStatus: StatusType;
  fetchError: string | any;
  createStatus: StatusType;
  createError: string | any;
};

declare type MessageType = {
  _id: string;
  message: string;
  senderId: string;
  images: any[];
  seen: boolean;
  chatId: string;
  createdAt: string | any;
};

declare type MessageStateType = {
  messages: MessageType[];
  onReply: boolean;
  onEdit: boolean;
  onReact: boolean;
  actionMessage: MessageType;
  fetchStatus: StatusType;
  fetchError: string | any;
  sendStatus: StatusType;
  sendError: string | any;
  editStatus: StatusType;
  editError: string | any;
  replyStatus: StatusType;
  replyError: string | any;
  deleteStatus: any;
};

declare type CheckOutType = {
  userId: string;
  products: ProductType[];
  eachQuantity: string[];
  totalPrice: number;
};

declare type OrderStateType = {
  orders: OrderType[];
  marchants: OrderType[];
  check_out: CheckOutType;
  createStatus: StatusType;
  createError: string | any;
  fetchStatus: StatusType;
  fetchError: string | any;
  fetchMarchantsStatus: StatusType;
  fetchMarchantError: string | any;
  cancelStatus: StatusType;
  cancelError: string | any;
  confirmStatus: StatusType;
  confirmError: string | any;
  releaseStatus: StatusType;
  releaseError: string | any;
  completeStatus: StatusType;
  completeError: string | any;
};

declare type VoucherStateType = {
  _all: VoucherType[];
  vouchers: VoucherType[];
  generate_status: StatusType;
  generate_error: string | any;
  _all_fetchStatus: StatusType;
  _allfetchError: string | any;
  fetchStatus: StatusType;
  fetchError: string | any;
  validateStatus: StatusType;
  validateError: string | any;
  discountedPrice: number;
  applied: string;
};

declare type NotificationStateType = {
  notifications: NotificationType[];
};

declare type SavedProductStateType = {
  items: ProductType[];
};

declare type TestUserStateType = {
  users: UserType[];
  fetchStatus: StatusType;
  fetchError: string | any;
  addStatus: StatusType;
  addError: string | any;
};
