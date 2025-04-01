import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category.interface';

// Extend Mongoose Document with ICategory
interface ICategoryDocument extends Document, ICategory {}

// Define the schema
const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

//Generating Slug
categorySchema.pre<ICategory>('validate', async function (next) {
  if (this.isModified('name')) {
    const baseSlug = this.name
      .toLocaleLowerCase()
      .replace(/ /g, '-') //Replaces all spaces with -
      .replace(/[^\w-]+/g, ''); //Removes all characters that are not letters, numbers, underscores (_), or hyphens (-).
    let slug = baseSlug;
    let counter = 1;
    while (await Category.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

export const Category = model<ICategoryDocument>('Category', categorySchema);
