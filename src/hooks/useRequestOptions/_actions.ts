import { req } from 'services';

import { optionFormatter } from 'utils';

import {
  TBusinessCategoryType,
  TDashboardTerminalType,
  TOperatingCityType,
  TOperatingHoursType,
  TOperatorRoleType,
  TParams,
  TRoleType,
  TRouteType,
  TTerminalType,
  TUserLevelType,
} from './_types';

export const getRoleType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TRoleType[]>({
    url: `/acl/role`,
    params: {
      keyword,
      page: 1,
      is_active: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'id', 'name', options);
  return x;
};

export const getBusinessCategoryType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TBusinessCategoryType[]>({
    url: `/operator_transaction/v1/dataset?type=BUSINESS_CATEGORY`,
    params: {
      keyword,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'slug', 'value', options);
  return x;
};

export const getRouteType = async (
  params?: TParams & { operator_uuid?: string }
) => {
  const { keyword, options, operator_uuid } = params ?? {};

  const response = await req.get<TRouteType[]>({
    url: `/core_ticket/v1/routes/${operator_uuid}/dropdown`,
    params: {
      keyword,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'uuid', 'name', options);
  return x;
};

export const getTerminalType = async (
  params?: TParams & { operator_uuid?: string }
) => {
  const { keyword, options, operator_uuid } = params ?? {};
  const response = await req.get<TTerminalType[]>({
    url: `/core_ticket/v1/terminals/${operator_uuid}/list`,
    params: {
      keyword,
      status: true,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'uuid', 'name', options);
  return x;
};

export const getOperatorType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TTerminalType[]>({
    url: `/core_operator/v1/organization`,
    params: {
      keyword,
      is_active: true,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'uuid', 'name', options);
  return x;
};

export const getUserLevelType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TUserLevelType[]>({
    url: `/operator_transaction/v1/dataset?type=USER_LEVEL`,
    params: {
      keyword,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'slug', 'value', options);
  return x;
};

export const getOperatingHoursType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TOperatingHoursType[]>({
    url: `/operator_transaction/v1/dataset?type=TIME`,
    params: {
      keyword,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'label', 'value', options);
  return x;
};

export const getDashboardTerminalType = async (params?: TParams) => {
  const { options } = params ?? {};
  const response = await req.get<TDashboardTerminalType[]>({
    url: `/dashboard/v1/operator/terminals/dropdown`,
    params: {
      page: 1,
      per_page: 100,
    },
  });
  const x = optionFormatter(response, 'uuid', 'name', options);
  return x;
};

export const getOperatorRoleType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TOperatorRoleType[]>({
    url: `/operator_transaction/v1/dataset?type=OPERATOR_ROLE`,
    params: {
      keyword,
      page: 1,
      per_page: 50,
    },
  });
  const x = optionFormatter(response, 'value', 'value', options);
  return x;
};

export const getOperatingCityType = async (params?: TParams) => {
  const { keyword, options } = params ?? {};
  const response = await req.get<TOperatingCityType[]>({
    url: `/core_ticket/v1/cities`,
    params: {
      keyword,
      page: 1,
      per_page: 50,
      order_by: 'created_at',
      sort_by: 'desc',
      status: true,
    },
  });
  const x = optionFormatter(response, 'uuid', 'name', options);
  return x;
};
