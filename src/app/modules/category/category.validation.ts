import { z } from 'zod';

//Create category validation schema
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty('Category name is required')
      .max(80, 'Category name should not exceed 80 characters'),
    description: z
      .string()
      .nonempty('Category description is required')
      .max(150, 'Category name should not exceed 150 characters'),
    parent: z.string().optional().nullable(),
    icon: z.string().nonempty('Category Icon is required.'),
  }),
});
//Update category validation schema
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(80, 'Category name should not exceed 80 characters')
      .optional(),
    description: z
      .string()
      .max(150, 'Category name should not exceed 150 characters')
      .optional(),
    icon: z.string().optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
