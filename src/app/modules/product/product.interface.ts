/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  sku: string;
  quantity: number;
  price: number;
  offerPrice?: number | null;
  category: Types.ObjectId;
  brand: Types.ObjectId;
  description: string;
  specification: Record<string, any>;
  keyFeatures: string[];
  inStock: boolean;
  images: string[];
  isActive: boolean;
  isFeatured?: boolean;
  rating: number;
  totalReviews: number;
  totalRating: number;
  weight: number;
  salesCount?: number;
  flashSale?: {
    active: boolean;
    discountPrice: number;
    startTime: Date;
    endTime: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
