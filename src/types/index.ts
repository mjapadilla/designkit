import dayjs from 'dayjs';
import { IconType } from 'react-icons';
import { z } from 'zod';

import permissionJson from './_permissions';

export type TPermissions = (typeof permissionJson)[number];

export const ZPagnition = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
  path: z.string(),
});

export const ParamsSchema = z.object({
  per_page: z.number(),
  order_by: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .or(z.string())
    .optional(),
  name: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .or(z.string())
    .optional(),
  sort_by: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .or(z.string())
    .optional(),
  is_active: z
    .object({
      label: z.string(),
      value: z.number(),
    })
    .or(z.string())
    .optional(),
  status: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .or(z.string())
    .optional(),
  page: z.number().optional(),
  date: z
    .object({
      value: z.string().optional(),
      label: z.string().optional(),
      data: z.object({
        from: z.union([z.string(), z.instanceof(dayjs.Dayjs)]).optional(),
        to: z.union([z.string(), z.instanceof(dayjs.Dayjs)]).optional(),
      }),
    })
    .optional(),
  keyword: z.string().optional(),
});

export type TParams = z.infer<typeof ParamsSchema>;
export type TPagination = z.infer<typeof ZPagnition>;

export type TOption = {
  label: string;
  value: string | number;
};

export type TDirectory = {
  key: string;
  to: string;
  path: string;
  component?: React.ComponentType;
  module_permissions: TPermissions[];
  name?: string;
  group_by?: string;
  groups?: TDirectory[];
  icon?: IconType | null;
  title?: string;
  description?: string;
};
