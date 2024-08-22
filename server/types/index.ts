import { Request } from "express";

export type AddressType = {
  state: string;
  city: string;
  address: string;
  current: boolean;
  id: string;
};

export type UserTokenType = {
  name: string;
  email: string;
  slug: string;
  number: string;
  profile?: object | string | any;
  isAdmin: boolean;
  isSeller: boolean;
  isVerified: boolean;
  isNumberVerified: boolean;
  _id?: string | any;
  address: AddressType[];
  type: string;
};

export interface AuthenticatedRequest extends Request {
  user: any;
  adminUser?: any;
}

export type NotificationType = {
  userId: string;
  body: string;
  type: string;
  notifyId: string;
  seen: boolean;
};

export type DateRangeType = {
  from: string;
  to: string;
};
