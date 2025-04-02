import { z } from 'zod';

//Create Brand validation schema
const createBrandValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty('Brand name is required')
      .max(80, 'Brand name should not exceed 80 characters'),
    description: z
      .string()
      .nonempty('Brand description is required')
      .max(150, 'Brand name should not exceed 150 characters'),
    logo: z.string().nonempty('Brand Logo is required.'),
  }),
});

//Update Brand validation schema
const updateBrandValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(80, 'Brand name should not exceed 80 characters')
      .optional(),
    description: z
      .string()
      .max(150, 'Brand name should not exceed 150 characters')
      .optional(),
    logo: z.string().optional(),
  }),
});

export const BrandValidations = {
  createBrandValidationSchema,
  updateBrandValidationSchema,
};
