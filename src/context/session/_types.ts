import { z } from 'zod';

export const AuthDatSchema = z.object({
  token: z.string(),
});

export type TAuthData = z.infer<typeof AuthDatSchema>;

export type TPayload = {
  auth_code: string;
};
