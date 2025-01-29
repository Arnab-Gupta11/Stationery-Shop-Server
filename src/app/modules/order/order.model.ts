import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1.'],
        },
        totalPrice: {
          type: Number,
          required: true,
          min: [0, 'Total price must be a positive number.'],
        },
      },
    ],
    totalOrderPrice: {
      type: Number,
      required: true,
      min: [0, 'Total order price must be a positive number.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
