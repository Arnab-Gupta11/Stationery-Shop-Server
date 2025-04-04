import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';
import { generateSlug } from '../../utils/generateSlug';
import crypto from 'crypto';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required.'],
      unique: true,
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required.'],
      min: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: 0,
    },
    offerPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required.'],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'Product brand is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
      trim: true,
    },
    specification: {
      type: Schema.Types.Mixed,
      required: [true, 'Product specification is required.'],
      default: {},
    },
    keyFeatures: {
      type: [String],
      required: [true, 'Product key feature is required.'],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      required: [true, 'Product image is required.'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      required: [true, 'Product weight is required.'],
      default: 0,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    flashSale: {
      active: { type: Boolean, default: false },
      discountPrice: { type: Number, min: 0 },
      startTime: { type: Date },
      endTime: { type: Date },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//Pre hook for generate slug
productSchema.pre<IProduct>('validate', async function (next) {
  //Generating Slug.
  if (this.isModified('name')) {
    const baseSlug = generateSlug(this.name);
    let slug = baseSlug;
    let count = 1;
    while (await Product.exists({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }
    this.slug = slug;
  }
  next();
});

//Pre hook for generate sku
productSchema.pre<IProduct>('save', async function (next) {
  if (!this.sku) {
    const base = crypto
      .createHash('md5')
      .update(this._id.toString())
      .digest('hex')
      .slice(0, 8)
      .toUpperCase(); // e.g., "D41D8CD9"

    const count = await Product.countDocuments();
    const productNo = (count + 1).toString().padStart(4, '0'); // e.g., "0001"
    this.sku = `${base}-${productNo}`;
  }

  next();
});

const Product = model<IProduct>('Product', productSchema);
export default Product;
