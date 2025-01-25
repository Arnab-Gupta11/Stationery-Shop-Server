import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: 'Full Name is required.' })
      .max(100, 'Full name cannot exceed 100 characters'),
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Invalid email format')
      .max(255, 'Email cannot exceed 255 characters'),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password cannot exceed 100 characters'),
    confirmedPassword: z
      .string({ required_error: 'Confirmed Password is required.' })
      .min(8, 'Confirmed password must be at least 8 characters long')
      .max(100, 'Confirmed password cannot exceed 100 characters'),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
