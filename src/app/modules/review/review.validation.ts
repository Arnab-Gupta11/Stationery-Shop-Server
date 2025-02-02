import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5'),
    review: z.string().min(5, 'Comment must be at least 5 characters long'),
    product: z.string().min(1, 'Product is required'),
  }),
});
const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5')
      .optional(),
    review: z
      .string()
      .min(5, 'Comment must be at least 5 characters long')
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
