import { z } from 'zod';

// Define the Zod schema
export const AdminValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .nonempty({ message: 'Name is required' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  }),
});

export const AdminValidation = {
  AdminValidationSchema,
};
