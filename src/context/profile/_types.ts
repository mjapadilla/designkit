import { z } from 'zod';

export const ZResponse = z.object({
  id: z.number(),
  uuid: z.string(),
  email: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  profile: z.object({
    id: z.number(),
    first_name: z.string(),
    middle_name: z.string(),
    last_name: z.string(),
    mobile_number: z.string().or(z.null()),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  role: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    code: z.string(),
    is_active: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  human_role_name: z.string(),
  human_full_name: z.string(),
});

export type TResponse = z.infer<typeof ZResponse>;
