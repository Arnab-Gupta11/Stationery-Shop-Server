//Define Typescript type for Order.
import { Types } from 'mongoose';

export type TOrder = {
  email: string;
  product?: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};
