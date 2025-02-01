import { z } from 'zod';

export const reviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5'),
    comment: z.string().min(5, 'Comment must be at least 5 characters long'),
  }),
});
