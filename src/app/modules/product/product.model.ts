import { Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
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
  inStock: {
    type: Boolean,
    required: [true, 'Product stock is required'],
  },
});
