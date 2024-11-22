import { model, Schema, Types } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Customer email is required'],
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address.',
    ],
    trim: true,
  },
  product: {
    type: Types.ObjectId,
    required: [true, 'Product id is required'],
    trim: true,
    validate: {
      validator: function (value: Types.ObjectId) {
        return Types.ObjectId.isValid(value);
      },
    },
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [1, 'Product quantity must be atleast 1.'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total Price is required'],
    min: [0, 'Total price cannot be negative.'],
  },
});

export const Order = model<TOrder>('Order', orderSchema);
