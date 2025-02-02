import { Types } from 'mongoose';

export type TReview = {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  review: string;
};

export type TReviewPayload = Pick<TReview, 'product' | 'rating' | 'review'>;
