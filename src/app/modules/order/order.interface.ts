//Define Typescript type for Order.
import { Types } from 'mongoose';

export type TOrderProduct = {
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};

export type TOrder = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  products: TOrderProduct[];
  totalOrderPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  createdAt?: Date;
  updatedAt?: Date;
};
export type TProductsOrder = {
  products: { product: string; quantity: number }[];
};
