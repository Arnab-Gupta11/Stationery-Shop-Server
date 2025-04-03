import { z } from 'zod';

export const createProducValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Product name is required.',
      })
      .trim(),
    quantity: z
      .number({
        required_error: 'Product quantity is required.',
      })
      .int()
      .min(0, 'Quantity cannot be negative.'),
    price: z
      .number({
        required_error: 'Product price is required.',
      })
      .min(0, 'Price cannot be negative.'),
    category: z.string({
      required_error: 'Product category is required.',
    }),
    brand: z.string({
      required_error: 'Product brand is required.',
    }),
    description: z
      .string({
        required_error: 'Product description is required.',
      })
      .trim(),
    specification: z.record(z.any()).optional().default({}),
    keyFeatures: z
      .string({
        required_error: 'Product key feature is required.',
      })
      .array()
      .optional()
      .default([]),
    images: z
      .string({
        required_error: 'Product image is required.',
      })
      .array(),
    weight: z
      .number({
        required_error: 'Product weight is required.',
      })
      .min(0, 'Weight cannot be negative.')
      .default(0),
  }),
});

export const ProductValidations = {
  createProducValidationSchema,
};
