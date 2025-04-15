import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty'),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, 'Content cannot be empty'),
    image: z.string({
      required_error: 'Image is required',
    }),
    category: z
      .string({
        required_error: 'Category is required',
      })
      .min(1, 'Content cannot be empty'),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty')
      .optional(),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, 'Content cannot be empty')
      .optional(),
    image: z
      .string({
        required_error: 'Image is required',
      })
      .optional(),
    category: z
      .string({
        required_error: 'Category is required',
      })
      .min(1, 'Content cannot be empty')
      .optional(),
  }),
});
export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
