import { Types } from 'mongoose';

export type TFavourite = {
  userId: Types.ObjectId;
  products: Types.ObjectId[];
};

export type TFavouritePayload = {
  productId: string;
};
