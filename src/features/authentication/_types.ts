import { z } from 'zod';

const ZResponse = z.object({
  token: z.string(),
});

export const ZPayload = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export type TResponse = z.infer<typeof ZResponse>;
export type TPayload = z.infer<typeof ZPayload>;
