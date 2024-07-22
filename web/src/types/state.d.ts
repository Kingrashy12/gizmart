declare type StatusType = "pending" | "successful" | "failed" | "";

declare type CartState = {
  items: ProductType[];
};

declare type AuthState = {
  token: string;
  userId: string;
  name: string;
  username: string;
  email: string;
  profile: object | string;
  number: string;
  loginStatus: StatusType;
  loginError: string | any;
  registerStatus: StatusType;
  registerError: string | any;
  userLoaded: boolean;
  accountType: AccountType;
};

// Context Types

declare type ContextProviderProps = {
  children: React.ReactNode;
};

declare type ModalContextTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
