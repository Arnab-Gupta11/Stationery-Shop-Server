import { Document, Types } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  description?: string;
  slug: string;
  isActive: boolean;
  createdBy: Types.ObjectId;
  logo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
