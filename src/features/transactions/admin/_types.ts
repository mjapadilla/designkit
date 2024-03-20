import { z } from 'zod';

const ResponseSchema = z.object({
  uuid: z.string(),
  transaction_id: z.string(),
  channel: z.string(),
  amount: z.string(),
  date: z.string(),
  remakrs: z.string(),
  status: z.enum(['SUCCESS', 'FAILED']),
});

export type TResponse = z.infer<typeof ResponseSchema>;

export type TExtendedResponse = {
  human_date: string;
};
