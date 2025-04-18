import mongoose, { Schema } from 'mongoose';
import { IBrand } from './brand.interface';
import { generateSlug } from '../../utils/generateSlug';

const brandSchema: Schema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Brand slug is required'],
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);

// Generate slug before saving
brandSchema.pre<IBrand>('validate', async function (next) {
  if (this.isModified('name')) {
    const baseSlug = generateSlug(this.name);
    let slug = baseSlug;
    let counter = 1;
    while (await Brand.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const Brand = mongoose.model<IBrand>('Brand', brandSchema);

export default Brand;
