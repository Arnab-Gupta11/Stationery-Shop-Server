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
  status: 'Pending' | 'Shipping';
  paymentStatus: 'Pending' | 'Paid' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
export type TProductsOrder = {
  products: { product: string; quantity: number }[];
};
