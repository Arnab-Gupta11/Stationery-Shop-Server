import { Document } from 'mongoose';

export interface IBlog extends Document {
  // _id: ObjectId;
  title: string;
  content: string;
  image: string;
  category: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
