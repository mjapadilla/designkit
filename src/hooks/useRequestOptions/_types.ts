import { z } from 'zod';

export type TParams = {
  keyword: string;
  options?: {
    withData?: boolean;
    isLabelUpperCase?: boolean;
  };
};

const RoleTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  is_active: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const BusinessCategoryTypeSchema = z.object({
  id: z.number(),
  parent_id: z.string(),
  value: z.string(),
  slug: z.string(),
  type: z.string(),
  description: z.string(),
  icon: z.string(),
  is_active: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const RouteTypeSchema = z.object({
  uuid: z.string(),
  organization_uuid: z.string(),
  name: z.string(),
  terminals: z.array(z.object({ uuid: z.string(), name: z.string() })),
  img_url: z.null(),
  type: z.string(),
  description: z.null(),
  is_active: z.boolean(),
  is_unlimited: z.boolean(),
  number_of_seat: z.string(),
  created_at: z.string(),
});

const TerminalSchema = z.object({
  uuid: z.string(),
  transportation_uuid: z.string(),
  city_uuid: z.string(),
  name: z.string(),
  geoloc: z.string(),
  address: z.string(),
  description: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
});

const OperatorSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
  logo: z.string(),
  geo_loc: z.string(),
  address: z.string(),
  icon: z.string(),
  business_type: z.string(),
  created_at: z.string(),
  transportation_uuid: z.string(),
  avg_daily_collection: z.string(),
});

const OperatingHoursSchema = z.object({
  id: z.number(),
  parent_id: z.string(),
  value: z.string(),
  slug: z.string(),
  label: z.string(),
  type: z.string(),
  description: z.string(),
  icon: z.string(),
  is_active: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const DashboardTerminalSchema = z.object({
  name: z.string(),
  uuid: z.string(),
});

const OperatingCitySchema = z.object({
  uuid: z.string(),
  organization_uuid: z.string(),
  name: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
});

export type TRoleType = z.infer<typeof RoleTypeSchema>;
export type TRouteType = z.infer<typeof RouteTypeSchema>;
export type TOperatorType = z.infer<typeof OperatorSchema>;
export type TTerminalType = z.infer<typeof TerminalSchema>;
export type TUserLevelType = z.infer<typeof BusinessCategoryTypeSchema>;
export type TBusinessCategoryType = z.infer<typeof BusinessCategoryTypeSchema>;
export type TOperatorRoleType = z.infer<typeof BusinessCategoryTypeSchema>;
export type TOperatingHoursType = z.infer<typeof OperatingHoursSchema>;
export type TDashboardTerminalType = z.infer<typeof DashboardTerminalSchema>;
export type TOperatingCityType = z.infer<typeof OperatingCitySchema>;
