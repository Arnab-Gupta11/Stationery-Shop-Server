import { z } from 'zod';

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

export const CategoryValidations = {
  createCategoryValidationSchema,
};
