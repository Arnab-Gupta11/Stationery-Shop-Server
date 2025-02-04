import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

//Define a Mongoose schema for the Product model.
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Product Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required'],
      min: [0, 'Product price must be a positive number.'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message:
          '{VALUE} is not a valid category. Allowed categories are Writing,Office Supplies,Art Supplies,Educational and Technology',
      },
      required: [true, 'Product Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Product Description is required.'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [0, 'Product quantity must be a positive number.'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      required: [true, 'Product stock is required'],
      default: true,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
//Product Model
export const Product = model<TProduct>('Product', productSchema);
